import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { checkmarkCircleOutline, closeOutline, returnDownBackOutline } from 'ionicons/icons';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{textAlign:"center"}}>Pagina Principal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Pendientes</IonCardTitle>
          </IonCardHeader>
          <IonList>
              <IonItem>
                <IonIcon slot="end" icon={closeOutline}></IonIcon>
                <IonIcon slot="end" icon={checkmarkCircleOutline}></IonIcon>
                <IonLabel>Item 1</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="end" icon={closeOutline}></IonIcon>
                <IonIcon slot="end" icon={checkmarkCircleOutline}></IonIcon>
                <IonLabel>Item 2</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="end" icon={closeOutline}></IonIcon>
                <IonIcon slot="end" icon={checkmarkCircleOutline}></IonIcon>
                <IonLabel>Item 3</IonLabel>
              </IonItem>
          </IonList>
        </IonCard>
        

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Completados</IonCardTitle>
          </IonCardHeader>
          <IonList>
              <IonItem>
                <IonIcon slot="end" icon={returnDownBackOutline}></IonIcon>
                <IonLabel>Item 1</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="end" icon={returnDownBackOutline}></IonIcon>
                <IonLabel>Item 2</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="end" icon={returnDownBackOutline}></IonIcon>
                <IonLabel>Item 3</IonLabel>
              </IonItem>
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
