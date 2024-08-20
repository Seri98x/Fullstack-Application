import{ useEffect, useRef, useState } from 'react';
import { IonPage, IonContent, IonButton, IonIcon, IonList, IonItem, IonLabel, IonText, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonInput, useIonToast, IonSearchbar } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store'; // Adjust the path to your store file
import { createProductAsync, getProductsAsync } from '../store/productSlice'; // Adjust the path to your productSlice
import { addOutline } from 'ionicons/icons'; // For the icons
import '../styles/Homepage.css'; // Add your styles here
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { RootState } from '../store/store';


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}




function Homepage() {
  const [present] = useIonToast();

  const modal = useRef<HTMLIonModalElement>(null);
  const addProductName = useRef<HTMLIonInputElement>(null);
  const addProductDescription = useRef<HTMLIonInputElement>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // State for filtered products
  const addProductPrice = useRef<HTMLIonInputElement>(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.prod.products);

  const presentToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
    present({
      message,
      duration: 2000,
      position: position,
    });
  };
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(getProductsAsync()); // Fetch products when token is present
    }
  }, [token, navigate, dispatch]); // Depend on token and dispatch to avoid infinite loop

  useEffect(() => {
    // Filter products based on the search term
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);


  function confirm() {
    modal.current?.dismiss([
      addProductName.current?.value,
      addProductDescription.current?.value,
      addProductPrice.current?.value
    ], 'confirm');

    const name: string = String(addProductName.current?.value || '').trim();
    const description: string = String(addProductDescription.current?.value || '').trim();
    const priceString = addProductPrice.current?.value || '0';
    const price = parseFloat(String(priceString));

    if (!name || !description || isNaN(price) || price <= 0) {
      alert(
        'Please ensure all fields are filled correctly:\n' +
        'Name and description are required.\n' +
        'Price must be a positive number.'
      );
      return;
    }

    const newProduct: Product = {
      id: "",
      name,
      description,
      price,
    };
     presentToast('bottom',"Created an item!")
    dispatch(createProductAsync(newProduct));
   
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      // Handle the confirmation logic if needed
    }
  }

  const showProductDetailsPage = (id: string) => {
    navigate(`/productDetails/${id}`); // Navigate with the product id
  };

  function openCreateProductModal() {
    modal.current?.present();
  }

  return (
    <IonPage>
      <IonContent>
      <IonSearchbar
          value={searchTerm}
          onIonInput={(e) => setSearchTerm(e.detail.value as string)}
          debounce={0} // Adjust debounce for better performance if needed
          placeholder="Search products..."
        />        <div className='ion-button-container'>
          <IonButton size="large" className='ion-button-add' id="open-modal" onClick={openCreateProductModal}>
            Add item
            <IonIcon slot="end" icon={addOutline}></IonIcon>
          </IonButton>
        </div>
        <IonList inset={true}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <IonItem
                key={product.id}
                button={true}
                className='product'
                onClick={() => showProductDetailsPage(product.id)}
              >
                <img src={'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg'} className='product-image' alt={product.name} />
                <IonLabel  className='product-name' >
                  <h1>{product.name}</h1>
                  <IonText    color="medium">
                    <p>{product.description}</p>
                    <p>Price: ${product.price.toFixed(2)}</p>
                  </IonText>
                </IonLabel>
              </IonItem>
            ))
          ) : (
            <IonText color="medium">No products available</IonText>
          )}
        </IonList>

        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Add a product</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonInput
                label="Enter product name"
                labelPlacement="stacked"
                ref={addProductName}
                type="text"
                placeholder="Product name"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Enter product description"
                labelPlacement="stacked"
                ref={addProductDescription}
                type="text"
                placeholder="Product Description"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Enter product price"
                labelPlacement="stacked"
                ref={addProductPrice}
                type="number"
                placeholder="Product Price"
              />
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default Homepage;
