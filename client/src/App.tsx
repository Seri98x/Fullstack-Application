import { useEffect, useState } from 'react';
import {
  IonApp,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import ProductDetails from './pages/ProductDetails';
import { home, logOut } from 'ionicons/icons';
import PrivateRoute from './utilities/PrivateRoute';


setupIonicReact();

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';
  const [pageTitle, setPageTitle] = useState('Ionic App');


  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/productDetails')) {
      setPageTitle('Product Details');
    } else {
      switch (path) {
        case '/homepage':
          setPageTitle('Home Page');
          break;
        case '/login':
          setPageTitle('Login');
          break;
        default:
          setPageTitle('Ionic App');
      }
    }
  }, [location.pathname]);

  function logoutUser() {
     sessionStorage.removeItem('token');
     navigate('/login');
  }

  function navToHome() {
  navigate('/');
  }

  return (
    <IonApp className='ion-app'>
      {!isLoginPage && (
        <IonMenu contentId="main-content" >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem button={true} onClick={navToHome}>
                <IonIcon color="medium" slot="start" icon={home} size="large"></IonIcon>
                <IonLabel>Home</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
          <IonFooter  translucent={true} className="ion-no-border">
          <IonItem button={true} onClick={logoutUser} slot="end">
                <IonIcon color="danger" slot="start" icon={logOut} size="large"></IonIcon>
                <IonLabel>Logout</IonLabel>
              </IonItem>
          </IonFooter>
        </IonMenu>
      )}

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            {!isLoginPage && (
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
            )}
            <IonTitle>{pageTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
       



        <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<PrivateRoute />}>
        {/* Default route redirects to /homepage */}
        <Route path="/" element={<Navigate to="/homepage" replace   />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="productdetails/:id" element={<ProductDetails />} />
        <Route path="*" element={<Navigate to="/homepage" replace />} />
      </Route>
    </Routes>


          

        </IonContent>
      </IonPage>
    </IonApp>
  );
}

export default App;
