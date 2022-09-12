import React from 'react';
import { IonApp, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonFooter, 
  IonMenu,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonPage ,
  IonButtons,
  IonButton,
  IonItem } from '@ionic/react';


  const App = () => (
    <IonApp>
      <IonMenu content-id="main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
  
      <IonContent>
        <IonList>
          <IonListHeader>
            Navigate
          </IonListHeader>
          <IonMenuToggle auto-hide="false">
            <IonItem button>
              <IonIcon slot="start" name='home'></IonIcon>
              <IonLabel>
                Home
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  
    <IonPage className="ion-page" id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuToggle>
              <IonButton>
                <IonIcon slot="icon-only" name='menu'></IonIcon>
              </IonButton>
            </IonMenuToggle>
          </IonButtons>
          <IonTitle>Header</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Main Content</h1>
        <p>Click the icon in the top left to toggle the menu.</p>
      </IonContent>
    </IonPage>
    </IonApp>
  );
  
  export default App;