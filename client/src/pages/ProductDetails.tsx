import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  IonText
} from '@ionic/react';
import '../styles/ProductDetails.css';



function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '', 10);
  const [product, setProduct] = useState<{ name: string; description: string; price: number; picture: string } | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Simulate fetching product details
    // Replace with actual fetch call
    const fetchedProduct = {
      name: 'Product Name',
      description: 'Product Description',
      price: 99.99,
      picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png'
    };

    setProduct(fetchedProduct);
    if (fetchedProduct) {
      setName(fetchedProduct.name);
      setDescription(fetchedProduct.description);
      setPrice(fetchedProduct.price);
    }
  }, [productId]);

  const handleUpdate = () => {
    // Handle update logic here
    console.log('Update', { name, description, price });
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log('Delete', productId);
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
                          <IonImg src={product.picture} />
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
      </IonContent>
    </IonPage>
  );
};

export default ProductDetails;
