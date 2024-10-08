import React from 'react';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store.tsx';
import { loginUser } from '../store/authSlice.tsx'
import {  useNavigate } from 'react-router-dom';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, useIonAlert, IonInputPasswordToggle } from '@ionic/react';
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

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };


    const handleClick = async () => {
        if (!username || !password) {
            presentAlert({
                header: 'Input Error',
                message: 'Please enter both username and password.',
                buttons: ['OK'],
            });
            return;
        }

        try {
            // Dispatch the login action
            const resultAction = await dispatch(loginUser({ username, password }));

            // Handle result
            if (loginUser.fulfilled.match(resultAction)) {
                // Successfully logged in
                const token = resultAction.payload;
                sessionStorage.setItem('token', JSON.stringify(token));
                setUsername('');
                setPassword('');
                navigate('/');
            } else {
                const statusCode = resultAction.error.message?.includes('401') ? 401 : 500;
                // Handle login failure
                presentAlert({
                    header: 'Login Failed',
                    message: statusCode === 401 ? 'Check credentials and try again.' : 'Failed to login. Please try again later.',
                    buttons: ['OK'],
                });
            }
        } catch (error) {
            presentAlert({
                header: 'Error',
                message: 'An error occurred during login. Please try again later.',
                buttons: ['OK'],
            });
            console.error('Login error:', error);
        }
    



    
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
                                onKeyDown={handleKeyDown}
                            ></IonInput>

                            <IonInput
                                //   className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                                type="password"
                                fill="outline"
                                label="Password"
                                labelPlacement="floating"
                                errorText="Invalid password"
                                value={password}
                                onIonInput={(event: CustomEvent) => setPassword(event.detail.value as string)}
                                onKeyDown={handleKeyDown}
                            >

                                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                            </IonInput>


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