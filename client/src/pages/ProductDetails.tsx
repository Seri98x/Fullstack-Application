import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
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
import { deleteProductAsync,updateProductAsync} from '../store/productSlice';
import { AppDispatch, RootState } from '../store/store';



function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [present] = useIonToast();
  const productId = parseInt(id || '', 10);
  const [product, setProduct] = useState<{ name: string; description: string; price: number; picture: string } | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const productsInit = useSelector((state: RootState) => state.prod.products );
  const products = productsInit

  const presentToast = (position: 'top' | 'middle' | 'bottom',message:string) => {
    present({
      message: message,
      duration: 3000,
      position: position,
    });
  };

  useEffect(() => {
    // Simulate fetching product details
    // Replace with actual fetch call
    const fetchedProduct = products.find(prod=>prod.id == id)

    setProduct(fetchedProduct as any);
    if (fetchedProduct) {
      setName(fetchedProduct.name);
      setDescription(fetchedProduct.description);
      setPrice(fetchedProduct.price);
    }
  }, [productId]);

  const handleUpdate = () => {
    // Initialize an array to collect error messages
    const errorMessages: string[] = [];
  
    // Check if each field is valid
    if (!name || name == "") {
      errorMessages.push('Name is required.');
    }
    if (!description || description == "") {
      errorMessages.push('Description is required.');
    }
    if (isNaN(price) || price <= 0) {
      errorMessages.push('Price must be a positive number.');
    }
  
    // If there are any error messages, log them and return
    if (errorMessages.length > 0) {
      presentToast('bottom', errorMessages.join(' '));
      return;
    }
  
    // Dispatch the updateProductAsync action if all fields are valid
    dispatch(updateProductAsync({
      id: String(productId),
      name: name,
      description: description,
      price: price
    }));
  
    // Show success toast message
    presentToast('bottom', "Updated Successfully!");
  
    // Navigate to the homepage after the update
    navigate('/homepage');
  };
  

  const handleDelete = () => {
    // Handle delete logic here
    dispatch(deleteProductAsync(String(productId)));
    navigate('/homepage');

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
                          <IonImg src={"https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png"} />
                        </IonCol>
                        <IonCol size="12" sizeLg="6">
                          <IonItem>
                            <IonLabel>Name</IonLabel>
                            <IonInput
                              value={name}
                              onIonChange={(e) => setName(e.detail.value!)}
                            />
                          </IonItem>
                          <IonItem>
                            <IonLabel>Description</IonLabel>
                            <IonInput
                              value={description}
                              onIonChange={(e) => setDescription(e.detail.value!)}
                            />
                          </IonItem>
                          <IonItem>
                            <IonLabel>Price</IonLabel>
                            <IonInput
                              type="number"
                              value={price}
                              onIonChange={(e) => setPrice(parseFloat(e.detail.value!))}
                            />
                          </IonItem>
                          <IonButton id="open-toast" expand="full" onClick={handleUpdate} color="primary">
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

      </IonContent> 

   
    </IonPage>
    
    
    
  );
};

export default ProductDetails;
