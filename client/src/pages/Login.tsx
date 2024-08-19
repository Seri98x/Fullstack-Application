import React from 'react';
import { useState } from 'react'
import { IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput } from '@ionic/react';


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleClick = async () => {


        try {
            // Log username and password to the console
            console.log(username + " " + password);

            // Make a fetch request to the local server
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',  // Adjust the method as needed
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),  // Send username and password in the body
            });

            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the JSON response
            const data = await response.json();
            console.log(data);  // Handle the response data as needed

        } catch (error) {
            // Handle any errors that occur during the fetch
            console.error('Fetch error:', error);
        }

    }


    return (

        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>
                        Login
                    </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>

                    <IonInput
                        //   className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                        type="email"
                        fill="outline"
                        label="Username"
                        labelPlacement="floating"
                        errorText="Invalid email"
                        value={username}
                        onIonInput={(event: CustomEvent) => setUsername(event.detail.value as string)}
                    //   onIonBlur={() => markTouched()}
                    ></IonInput>

                    <IonInput
                        //   className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                        type="email"
                        fill="outline"
                        label="Password"
                        labelPlacement="floating"
                        errorText="Invalid email"
                        value={password}
                        onIonInput={(event: CustomEvent) => setPassword(event.detail.value as string)}
                    //   onIonBlur={() => markTouched()}
                    ></IonInput>


                    <IonButton onClick={handleClick} >
                        Login
                    </IonButton>
                </IonCardContent>
            </IonCard>
        </IonContent>

    );
}

export default Login;