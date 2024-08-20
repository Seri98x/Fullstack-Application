import React from 'react';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store.tsx';
import { loginUser } from '../store/authSlice.tsx'
import { json, useNavigate } from 'react-router-dom';
import { IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonLabel, useIonAlert } from '@ionic/react';
import '../styles/Login.css'
import ionicLogo from '../assets/ioniclogo.png';
import reactLogo from '../assets/reactlogo.png';


function Login() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const [presentAlert] = useIonAlert();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);
   
     
    const handleClick = async () => {

        if(username !== "tae" && password !== "tae1")
        {
            presentAlert({
                header: 'Oops!',
                subHeader: 'Something is wrong',
                message: 'An error has occured check your username/password if the problem persists contact developer.',
                buttons: ['OK'],
            })
             return;
        }


        sessionStorage.setItem("token",JSON.stringify('DSADASDASDSADAD'));
        navigate('/');

        // try {
        //     const userCreds = {
        //         username,
        //         password
        //     };

        //     const resultAction = await dispatch(loginUser(userCreds)).then((result) => {
        //         if (result.payload) {
        //             setUsername("");
        //             setPassword("");
        //             navigate('/');
        //         }
        //     });



        // } catch (error) {
        //     // Handle any errors that occur during the fetch
        //     console.error('Fetch error:', error);
        // }

    }


    return (
          <div className="login-container">
            {token && token != "" && token != undefined ? ("" + token) :
                (
                    <IonCard >
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

                )}


                <div className='login-footer'>
                    <img src={ionicLogo}></img>
                    <img src={reactLogo}></img>

                </div>

               
              



</div>
       

    );
}

export default Login;