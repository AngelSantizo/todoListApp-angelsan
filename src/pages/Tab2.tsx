import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { useState } from 'react';
import { taskService } from '../services/TaskService';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Trabajo' | 'Casa' | 'Negocio'>('Trabajo');
  const router = useIonRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    taskService.addTask({
      title: title.trim(),
      description: description.trim(),
      category
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('Trabajo');
    
    // Navigate back to Tab1
    router.push('/tabs/tab1');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{textAlign:"center"}}>Agregar tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit} className="ion-padding">
          <IonInput 
            label="Título de tarea" 
            labelPlacement="stacked" 
            placeholder="Ingrese título"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
            required
            className="ion-margin-bottom"
          />
          
          <IonTextarea 
            label="Descripción" 
            labelPlacement="floating" 
            fill="solid" 
            placeholder="Ingrese descripción"
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
            className="ion-margin-bottom"
          />
          
          <IonLabel>Categoría</IonLabel>
          <IonSelect 
            value={category}
            onIonChange={(e) => setCategory(e.detail.value)}
            className="ion-margin-bottom"
          >
            <IonSelectOption value="Trabajo">Trabajo</IonSelectOption>
            <IonSelectOption value="Casa">Casa</IonSelectOption>
            <IonSelectOption value="Negocio">Negocio</IonSelectOption>
          </IonSelect>
          
          <IonButton 
            expand="block" 
            type="submit"
            className="ion-margin-top"
          >
            Agregar tarea
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
