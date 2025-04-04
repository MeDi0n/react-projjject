import { useState } from "react";

export default function ToDoList() {
  const [tasks, setTasks] = useState([
    { task: "Выучить React", completed: false },
    { task: "Сходить в зал", completed: false },
    { task: "Купить продукты", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState();

  const taskCompleted = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const inputChanged = (event) => {
    setNewTask(event.target.value);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const addNewTask = () => {
    if (newTask.trim()) {
      // Проверяем, чтобы строка не была пустой
      setTasks([...tasks, { task: newTask, completed: false }]);
      setNewTask(""); // Очищаем инпут после добавления
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <>
      <div
        style={{
          marginLeft: "450px",
          display: "flex",
          flexDirection: "column", // Элементы будут располагаться вертикально
          justifyContent: "center", // Выравнивание по вертикали
          alignItems: "center", // Выравнивание по горизонтали
          height: "100vh", // Высота на весь экран
        }}
      >
        <div>
          <button onClick={() => setFilter("all")} style={{ margin: "10px" }}>
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            style={{ margin: "10px" }}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("incomplete")}
            style={{ margin: "10px" }}
          >
            Incomplete
          </button>
        </div>
        {filteredTasks.map((task, index) => (
          <div key={index} style={{ margin: "10px" }}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                margin: "10px",
              }}
            >
              {task.task}
            </span>

            <button style={{ margin: "10px" }} onClick={{editIndex(i)}}>Edit</button>

            <button onClick={() => taskCompleted(index)}>
              {task.completed ? "Done" : "Mark it as done"}
            </button>

            <button
              style={{ margin: "10px" }}
              onClick={() => deleteTask(index)}
            >
              delete
            </button>
          </div>
        ))}
        <input
          type="text"
          value={newTask} // Синхронизируем инпут с состоянием
          onChange={inputChanged}
        />
        <button onClick={addNewTask}>Add</button>
      </div>
    </>
  );
}
