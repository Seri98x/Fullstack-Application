import { useState } from 'react'
import { IonApp, IonButton, IonContent,setupIonicReact } from '@ionic/react'
/* Core CSS required for Ionic components to work properly */
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

setupIonicReact();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <IonApp>
        <IonContent>
        <IonButton>Default</IonButton>
      <IonButton disabled={true}>Disabled</IonButton>
        </IonContent>
     
      </IonApp>
      
    
    </>
  )
}

export default App
