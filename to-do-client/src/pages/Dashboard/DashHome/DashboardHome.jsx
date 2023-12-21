import { useEffect, useState } from "react";
import CreateTask from "../../../components/ui/CreateTask/CreateTask";
import ListTasks from "../../../components/ui/ListTasks/ListTasks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DashboardHome = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(window.localStorage.getItem("tasks"));
    setTasks(storedTasks || []); // Use an empty array if tasks are null
  }, []);

  console.log(tasks);

  return (
    <section>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col items-center ">
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <ListTasks tasks={tasks} setTasks={setTasks} />
        </div>
      </DndProvider>
    </section>
  );
};

export default DashboardHome;
