import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonToast,
  useIonToast
} from '@ionic/react';
import '../styles/ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductAsync, updateProductAsync } from '../store/productSlice';
import store, { AppDispatch, RootState } from '../store/store';

function ProductDetails() {
  
  const { id } = useParams<{ id: string }>();
  const [present] = useIonToast();
  const productId = parseInt(id || '', 10);
  const [product, setProduct] = useState<{ name: string; description: string; price: number;} | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [showToast, setShowToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.prod.products);
  const presentToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
    present({
      message,
      duration: 2000,
      position: position,
    });
  };



  // Fetch product details on component mount or id change
  useEffect(() => {
    const fetchProductDetails = async () => {
      // Simulate a data fetching delay
      const fetchedProduct = products.find(prod => prod.id == String(productId));
    

      
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setName(fetchedProduct.name);
        setDescription(fetchedProduct.description);
        setPrice(fetchedProduct.price);
        localStorage.setItem('productDetails',JSON.stringify(fetchedProduct));
      } else
      {
       const storedProduct = JSON.parse(localStorage.getItem('productDetails') as any);
  
       setProduct(storedProduct);
       setName(storedProduct.name);
       setDescription(storedProduct.description);
       setPrice(storedProduct.price);
       
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId, products]);




 useEffect(() => {
  const storedProduct = JSON.parse(localStorage.getItem('productDetails') as any);
  if(storedProduct.id != id){
    navigate('/');
  }
},[])
 


 const handleUpdate = async () => {
    if (name && description && !isNaN(price) && price > 0) {
      try {
        await dispatch(updateProductAsync({
          id: String(productId),
          name,
          description,
          price
        })).unwrap();

        presentToast('bottom', 'Updated Successfully!');
        navigate('/homepage');
      } catch (error) {
        console.error('Error updating product:', error);
        presentToast('bottom', 'Failed to update product.');
      }
    } else {
      if (!name) presentToast('bottom', 'Name is required.');
      if (!description) presentToast('bottom', 'Description is required.');
      if (isNaN(price) || price <= 0) presentToast('bottom', 'Price must be a positive number.');
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteProductAsync(String(productId))).unwrap();
      presentToast('bottom', 'Deleted Successfully!');
      navigate('/homepage');
    } catch (error) {
      console.error('Error deleting product:', error);
      presentToast('bottom', 'Failed to delete product.');
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="12" sizeLg="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"></IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {product ? (
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeLg="6">
                          <IonImg src={'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg'}   />
                        </IonCol>
                        <IonCol size="12" sizeLg="6">
                          <IonItem>
                            <IonLabel>Name</IonLabel>
                            <IonInput
                              value={name}
                              onIonInput={(e) => setName(e.detail.value!)}
                            />
                          </IonItem>
                          <IonItem>
                            <IonLabel>Description</IonLabel>
                            <IonInput
                              value={description}
                              onIonInput={(e) => setDescription(e.detail.value!)}
                            />
                          </IonItem>
                          <IonItem>
                            <IonLabel>Price</IonLabel>
                            <IonInput
                              type="number"
                              value={price}
                              onIonInput={(e) => setPrice(parseFloat(e.detail.value!))}
                            />
                          </IonItem>
                          <IonButton expand="full" onClick={handleUpdate} color="primary">
                            Update
                          </IonButton>
                          <IonButton expand="full" onClick={handleDelete} color="danger">
                            Delete
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  ) : (
                    <IonText color="medium">Loading product details...</IonText>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
          isOpen={showToast.show}
          onDidDismiss={() => setShowToast({ show: false, message: '' })}
          message={showToast.message}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
}

export default ProductDetails;
