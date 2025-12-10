import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  useIonAlert,
  IonBadge
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { taskService, Task } from '../services/TaskService';
import { checkmarkCircleOutline, closeOutline, returnDownBackOutline, trashOutline } from 'ionicons/icons';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [tasks, setTasks] = useState<{active: Task[], completed: Task[]}>({active: [], completed: []});
  const [present] = useIonAlert();

  const loadTasks = () => {
    setTasks({
      active: taskService.getActiveTasks(),
      completed: taskService.getCompletedTasks()
    });
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

  const handleRestoreTask = (task: Task) => {
    taskService.toggleTaskCompletion(task.id);
    loadTasks();
  };

  const TaskItem: React.FC<{task: Task, showActions: boolean}> = ({ task, showActions }) => (
    <IonItem>
      <IonLabel>
        <h2>{task.title}</h2>
        {task.description && <p>{task.description}</p>}
        <IonBadge color="medium">{task.category}</IonBadge>
      </IonLabel>
      {showActions && (
        <>
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
            color="success" 
            onClick={(e) => {
              e.stopPropagation();
              handleCompleteTask(task);
            }}
          >
            <IonIcon slot="icon-only" icon={checkmarkCircleOutline} />
          </IonButton>
        </>
      )}
    </IonItem>
  );

  const CompletedTaskItem: React.FC<{task: Task}> = ({ task }) => (
    <IonItem>
      <IonLabel className="ion-text-wrap">
        <h2 style={{ textDecoration: 'line-through', color: '#666' }}>{task.title}</h2>
        {task.description && <p style={{ textDecoration: 'line-through' }}>{task.description}</p>}
        <IonBadge color="medium">{task.category}</IonBadge>
      </IonLabel>
      <IonButton 
        fill="clear" 
        color="medium"
        onClick={() => handleRestoreTask(task)}
      >
        <IonIcon slot="icon-only" icon={returnDownBackOutline} />
      </IonButton>
    </IonItem>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mis Tareas</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Pendientes</IonCardTitle>
            <IonCardSubtitle>{tasks.active.length} tareas</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {tasks.active.length > 0 ? (
              <IonList>
                {tasks.active.map(task => (
                  <TaskItem key={task.id} task={task} showActions={true} />
                ))}
              </IonList>
            ) : (
              <IonItem>
                <IonLabel className="ion-text-center">
                  <p>No hay tareas pendientes</p>
                </IonLabel>
              </IonItem>
            )}
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Completadas</IonCardTitle>
            <IonCardSubtitle>{tasks.completed.length} tareas</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {tasks.completed.length > 0 ? (
              <IonList>
                {tasks.completed.map(task => (
                  <CompletedTaskItem key={task.id} task={task} />
                ))}
              </IonList>
            ) : (
              <IonItem>
                <IonLabel className="ion-text-center">
                  <p>No hay tareas completadas</p>
                </IonLabel>
              </IonItem>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
