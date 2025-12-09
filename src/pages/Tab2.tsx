import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{textAlign:"center"}}>Agregar tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonInput label="Titulo de tarea" labelPlacement="stacked" placeholder="Ingrese titulo"></IonInput>
        <IonTextarea label="Descripcion tarea" labelPlacement="floating" fill="solid" placeholder="Ingrese descripcion"></IonTextarea>
        <IonLabel>Categoria</IonLabel>
        <IonSelect>
          <IonSelectOption value="Trabajo">Trabajo</IonSelectOption>
          <IonSelectOption value="Casa">Casa</IonSelectOption>
          <IonSelectOption value="Negocio">Negocio</IonSelectOption>
        </IonSelect>
        <IonButton expand="block">Agregar tarea</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
