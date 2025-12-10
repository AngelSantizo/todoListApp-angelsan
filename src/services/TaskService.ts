export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'Trabajo' | 'Casa' | 'Negocio';
  completed: boolean;
  createdAt: Date;
}

type TaskChangeCallback = () => void;

class TaskService {
  private tasks: Task[] = [];
  private static instance: TaskService;
  private changeListeners: TaskChangeCallback[] = [];

  private notifyChange() {
    this.changeListeners.forEach(callback => callback());
    // Also trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'));
  }

  private constructor() {
    // Load tasks from localStorage if available
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
    }
  }

  static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

  private saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask(task: Omit<Task, 'id' | 'completed' | 'createdAt'>) {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date()
    };
    this.tasks.push(newTask);
    this.saveToLocalStorage();
    this.notifyChange();
    return newTask;
  }

  addChangeListener(callback: TaskChangeCallback) {
    this.changeListeners.push(callback);
    return () => {
      this.changeListeners = this.changeListeners.filter(cb => cb !== callback);
    };
  }

  getAllTasks() {
    return [...this.tasks];
  }

  getTasksByCategory(category: string) {
    return this.tasks.filter(task => task.category === category);
  }

  toggleTaskCompletion(taskId: string) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.saveToLocalStorage();
      this.notifyChange();
    }
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveToLocalStorage();
    this.notifyChange();
  }

  getActiveTasks() {
    return this.tasks.filter(task => !task.completed);
  }

  getCompletedTasks() {
    return this.tasks.filter(task => task.completed);
  }
}

export const taskService = TaskService.getInstance();
