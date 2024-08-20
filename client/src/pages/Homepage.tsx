import React, { useEffect, useRef } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonMenuButton, IonLabel, IonList, IonItem, IonText, IonIcon, IonButtons, IonInput, IonModal } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store'; // Adjust the path to your store file
import { createProduct, fetchProducts, selectAllProducts } from '../store/productSlice'; // Adjust the path to your productSlice
import { addOutline } from 'ionicons/icons'; // For the icons
import '../styles/Homepage.css'; // Add your styles here
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

function Homepage() {
  const modal = useRef<HTMLIonModalElement>(null);
  const addProductName = useRef<HTMLIonInputElement>(null);
  const addProductDescription = useRef<HTMLIonInputElement>(null);
  const addProductPrice = useRef<HTMLIonInputElement>(null);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsInit = useSelector((state:any) => state.prod );
  const products = productsInit.products;
  console.log(products[0]);
  


  function confirm() {

    modal.current?.dismiss([addProductName.current?.value,addProductDescription.current?.value,addProductPrice.current?.value], 'confirm');
     const name : string = String(addProductName.current?.value || '') ;
    const description : string = String(addProductDescription.current?.value || '');
    const priceString = addProductPrice.current?.value || '0'; // Default to '0' if undefined
    const newProduct = {
      id: Date.now(), // Generate a unique ID (consider using a better method for unique IDs)
      name,
      description,
      priceString,
      picture: 'https://example.com/default-product.png' // Use a default picture or provide another method to add it
    };

    dispatch(createProduct(newProduct) as any);
    console.log(products);

  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
     
    }
  }



  useEffect(() => {
    if (!token) {
      navigate('login');
    } else {
      // dispatch( fetchProducts() as any); // Fetch products when component mounts
    }
  }, [token, navigate, dispatch]);

  const showProductDetailsPage = (id: number) => {
    navigate(`/productDetails/${id}`); // Navigate with the product id
  };

  function openCreateProductModal() {

    
  }

  return (
    <IonPage>
   
      <IonContent>

           <div className='ion-button-container'>

         
        <IonButton size="large" className='ion-button-add' id="open-modal" >
          Add item
          <IonIcon slot="end" icon={addOutline}></IonIcon>
        </IonButton>
        </div>
        <IonList inset={true}>
          {products.length > 0 ? (
            products.map((product:any) => (
              <IonItem
                key={product.id}
                button={true}
                className='product'
                onClick={() => showProductDetailsPage(product.id)}
              >
                <img src={product.picture} className='product-image' alt={product.name} />
                <IonLabel>
                  <h1>{product.name}</h1>
                  <IonText color="medium">
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
