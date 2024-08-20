import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonMenuButton, IonLabel, IonList, IonItem, IonText, IonIcon } from '@ionic/react';
import { useState, useEffect, MouseEventHandler } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import { trash, heart,eye,logoApple,settingsSharp,addOutline } from 'ionicons/icons'; // For the icons
import '../styles/Homepage.css'; // Add your styles here


function Homepage() {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    interface Product {
        id: number;
        name: string;
        description: string;
        price: number;
        picture: string; // URL for the product picture
      }
      const products: Product[] = [
        { id: 1, name: 'Product 1', description: 'Description for product 1', price: 29.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 2, name: 'Product 2', description: 'Description for product 2', price: 49.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
      ];


  function  showProductDetailsPage(id:number){
      
        navigate(`/productDetails/${id}`); // Navigate with the product id

   
  }

    // useEffect(() => {
    //     if (!token) {
    //         navigate('login');
    //     }
    // }, [token, navigate]);

    

    return ( 
        <IonContent>
         
       <IonPage>
       <IonButton size="large" className='ion-button-add'>
        Add item
        <IonIcon slot="end" icon={addOutline}></IonIcon>
      </IonButton>
      <IonHeader>
       
      </IonHeader>
      <IonContent>
        
        <IonList  inset={true}>
          {products.map((product) => (
            <IonItem key={product.id}  button={true}  className='product' onClick={() => showProductDetailsPage(product.id)} >
                 <img src={product.picture} className='product-image'/>
              <IonLabel>
                <h1>{product.name}</h1>
                <IonText color="medium">
                  <p>{product.description}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                </IonText>
              </IonLabel>
          
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
        </IonContent>
);
}

export default Homepage;