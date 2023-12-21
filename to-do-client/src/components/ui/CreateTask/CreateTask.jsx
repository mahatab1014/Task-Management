import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  console.log(task);

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3) {
      return toast.error("Please enter a valid task name");
    }

    setTasks((prev) => {
      const list = [...prev, task];
      window.localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });
    
    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <form className="flex items-center gap-3" onSubmit={handleTaskSubmit}>
      <input
        type="text"
        className="input-field !mt-0"
        defaultValue={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button className="btn btn-primary">Create</button>
    </form>
  );
};

export default CreateTask;
