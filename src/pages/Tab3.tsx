import { 
  IonContent, 
  IonHeader, 
  IonItem, 
  IonItemDivider, 
  IonItemGroup, 
  IonLabel, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonButton, 
  IonIcon,
  useIonAlert,
  IonBadge
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { taskService, Task } from '../services/TaskService';
import { checkmarkCircleOutline, trashOutline } from 'ionicons/icons';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    Trabajo: [],
    Casa: [],
    Negocio: []
  });
  const [present] = useIonAlert();

  const loadTasks = () => {
    const allTasks = taskService.getAllTasks();
    const tasksByCategory: { [key: string]: Task[] } = {
      Trabajo: [],
      Casa: [],
      Negocio: []
    };

    allTasks.forEach(task => {
      if (tasksByCategory[task.category]) {
        tasksByCategory[task.category].push(task);
      }
    });

    setTasks(tasksByCategory);
  };

  useEffect(() => {
    loadTasks();
    // Listen for task changes
    const unsubscribe = taskService.addChangeListener(loadTasks);
    
    return () => {
      unsubscribe();
    };
  }, []);

  const handleCompleteTask = (task: Task) => {
    taskService.toggleTaskCompletion(task.id);
    loadTasks();
  };

  const handleDeleteTask = (taskId: string) => {
    present({
      header: 'Eliminar tarea',
      message: '¿Estás seguro de que quieres eliminar esta tarea?',
      buttons: [
        'Cancelar',
        {
          text: 'Eliminar',
          handler: () => {
            taskService.deleteTask(taskId);
            loadTasks();
          }
        }
      ]
    });
  };

  const TaskItem: React.FC<{task: Task}> = ({ task }) => (
    <IonItem>
      <IonLabel>
        <h2 style={{ textDecoration: task.completed ? 'line-through' : 'none', 
                     color: task.completed ? '#666' : 'inherit' }}>
          {task.title}
        </h2>
        {task.description && <p>{task.description}</p>}
        <IonBadge color={task.completed ? 'medium' : 'primary'}>{task.category}</IonBadge>
      </IonLabel>
      <IonButton 
        fill="clear" 
        color="danger" 
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteTask(task.id);
        }}
      >
        <IonIcon slot="icon-only" icon={trashOutline} />
      </IonButton>
      <IonButton 
        fill="clear" 
        color={task.completed ? 'medium' : 'success'} 
        onClick={(e) => {
          e.stopPropagation();
          handleCompleteTask(task);
        }}
      >
        <IonIcon slot="icon-only" icon={checkmarkCircleOutline} />
      </IonButton>
    </IonItem>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tareas por Categoría</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Categorías</IonTitle>
          </IonToolbar>
        </IonHeader>

        {Object.entries(tasks).map(([category, categoryTasks]) => (
          <IonItemGroup key={category}>
            <IonItemDivider>
              <IonLabel>{category}</IonLabel>
              <IonBadge slot="end" color="primary">{categoryTasks.length}</IonBadge>
            </IonItemDivider>
            
            {categoryTasks.length > 0 ? (
              <IonList>
                {categoryTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </IonList>
            ) : (
              <IonItem>
                <IonLabel className="ion-text-center">
                  <p>No hay tareas en esta categoría</p>
                </IonLabel>
              </IonItem>
            )}
          </IonItemGroup>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
