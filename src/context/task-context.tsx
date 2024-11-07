// TaskContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  label: string;
}

interface TaskContextProps {
  tasks: Task[];
  addTask: (newTask: {
    title: string;
    status: string;
    priority: string;
    label: string;
  }) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  duplicateTask: (task: Task) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = () => {
    try {
      const taskJson = localStorage.getItem("tasks");

      if (!taskJson) {
        return [];
      }

      const parsedTasks = JSON.parse(taskJson);

      if (Array.isArray(parsedTasks)) {
        return parsedTasks;
      } else if (typeof parsedTasks === "object") {
        // Jika data yang ada berupa objek, anggap itu sebagai satu tugas
        return [parsedTasks];
      } else {
        console.error("Format tugas yang ada tidak valid:", parsedTasks);
        return [];
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat memparsing tugas dari local storage:", error);
      return [];
    }
  };

  const saveTasks = (data: any) => {
    const tasksJson = JSON.stringify(data);
    localStorage.setItem("tasks", tasksJson);
  };

  const addTask = (newTask: {
    title: string;
    status: string;
    priority: string;
    label: string;
  }) => {
    const tasks = getTasks();

    if (Array.isArray(tasks)) {
      const updatedTasks = [
        ...tasks,
        createTask(newTask.title, newTask.status, newTask.priority, newTask.label),
      ];
      saveTasks(updatedTasks);
      setTasks(updatedTasks);
    } else {
      console.error("Tugas yang ada bukan dalam format array:", tasks);
      // Menangani situasi jika tugas yang ada bukan array
      const updatedTasks = [
        createTask(newTask.title, newTask.status, newTask.priority, newTask.label),
      ];
      saveTasks(updatedTasks);
      setTasks(updatedTasks);
    }
  };

  const updateTask = (taskId: string, updatedTask: Partial<Task>) => {
    const tasks = getTasks();

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    saveTasks(updatedTasks);

    setTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const taskId = id;
    const tasks = getTasks();
    const updatedTasks = tasks.filter((task: any) => task.id !== taskId);
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const duplicateTask = (task: Task) => {
    const duplicatedTask = { ...task, id: uuidv4() };
    addTask(duplicatedTask);
  };

  useEffect(() => {
    const initialTasks = getTasks();
    setTasks(initialTasks);
  }, []); // Array dependensi kosong memastikan hanya dijalankan sekali saat komponen mount

  return (
    <TaskContext.Provider
      value={{ tasks, duplicateTask, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask harus digunakan di dalam TaskProvider");
  }
  return context;
};

const createTask = (
  title: string,
  status: string,
  priority: string,
  label: string
): Task => {
  return {
    id: uuidv4(),
    title,
    status,
    priority,
    label,
  };
};
