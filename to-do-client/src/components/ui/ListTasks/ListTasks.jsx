/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fClosed = tasks.filter((task) => task.status === "closed");

    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};

export default ListTasks;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = `${isOver ? "bg-stone-800" : "bg-stone-500"}`;
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = `${isOver ? "bg-purple-800" : "bg-purple-500"}`;
    tasksToMap = inProgress;
  }
  if (status === "closed") {
    text = "Closed";
    bg = `${isOver ? "bg-green-800" : "bg-green-500"}`;
    tasksToMap = closed;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      console.log("this is pre", prev);

      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });

      localStorage.setItem("tasks", JSON.stringify(mTasks));

      return mTasks;
    });
  };

  return (
    <div ref={drop} className="w-full mt-5">
      <Header text={text} bg={bg} count={tasksToMap.length} />
      <div className="space-y-1">
        {tasksToMap?.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} transition-all flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white mb-5`}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log(isDragging);

  const handleRemoveTask = (id) => {
    console.log(id);
    const fTasks = tasks.filter((t) => t.id !== id);

    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast("Task removed", { icon: "😥" });
  };

  return (
    <>
      <div ref={drag} tabIndex={0} className="collapse bg-base-200 relative">
        <div className="collapse-title text-sm font-medium">{task?.name} </div>
        <div className="collapse-content">
          <p className="text-sm">
            tabIndex attribute is necessary to make the div focusable
          </p>
        </div>
        <button
          type="submit"
          onClick={() => handleRemoveTask(task.id)}
          className="absolute right-2 bottom-2 btn btn-outline btn-xs btn-circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
      </div>
    </>
  );
};
