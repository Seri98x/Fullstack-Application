import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonMenuButton, IonLabel, IonList, IonItem, IonText } from '@ionic/react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { trash, eye } from 'ionicons/icons'; // For the icons
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
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 19.99, picture: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png' },
      ];
      
    // useEffect(() => {
    //     if (!token) {
    //         navigate('login');
    //     }
    // }, [token, navigate]);

    return ( 
        <IonContent>
       <IonPage>
      <IonHeader>
       
      </IonHeader>
      <IonContent>
        <IonList  inset={true}>
          {products.map((product) => (
            <IonItem key={product.id}  button={true}  className='product' >
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