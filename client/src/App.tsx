import { useState } from 'react'
import { IonApp, IonButton, IonContent,setupIonicReact } from '@ionic/react'
/* Core CSS required for Ionic components to work properly */
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import Login from './pages/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProductDetails from './pages/ProductDetails';

setupIonicReact();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <IonApp>


        <IonContent>

            <BrowserRouter>

             <Routes>


              <Route path="login" element={<Login/>}/>
              <Route path="/" element={<Homepage/>}/>
              <Route path="productdetails" element={<ProductDetails/>}/>

             </Routes>
 

            </BrowserRouter>

        </IonContent>


      </IonApp>
    </>
  )
}

export default App
