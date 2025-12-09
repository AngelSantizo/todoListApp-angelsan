import { IonContent, IonHeader, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{textAlign:"center"}}>Lista de tareas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Trabajo</IonLabel>
        </IonItemDivider>

        <IonItem>
          <IonLabel>Angola</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Argentina</IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Armenia</IonLabel>
        </IonItem>
      </IonItemGroup>

      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Casa</IonLabel>
        </IonItemDivider>

        <IonItem>
          <IonLabel>Bangladesh</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Belarus</IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Belgium</IonLabel>
        </IonItem>
      </IonItemGroup>

      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Negocio</IonLabel>
        </IonItemDivider>

        <IonItem>
          <IonLabel>Bangladesh</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Belarus</IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Belgium</IonLabel>
        </IonItem>
      </IonItemGroup>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
