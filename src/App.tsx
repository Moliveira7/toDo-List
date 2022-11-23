import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

const LOCAL_STORAGE_KEY = "toSave"

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}


export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  // retrieve task from browser
function recoveryTasks() {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) {
    setTasks(JSON.parse(saved));
  }
}
useEffect(() => {
  recoveryTasks();
}, []);


  // to save on your browser
  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskTitle: string) {
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(), // Id generator
        title: taskTitle,
        isCompleted: false,
      }
    ]);
  }
// using filter to remove task which has same id
  function deleteTaskById(taskId: string) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  
  function toggleTaskCompletedById(taskId: string) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (    
     <div>
       <>
        <Header onAddTask={addTask} />
        <Tasks 
          tasks={tasks} 
          onDelete={deleteTaskById}
          onComplete={toggleTaskCompletedById} 
        />
       </> 
     </div>  
  )
}