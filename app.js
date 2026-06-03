import express from "express";
import tasks from "./data/mock.js";

const app = express();

app.use(express.json());

// 전체 할 일 목록 조회
app.get("/tasks", (req, res) => {
  res.send(tasks);
});

// 하나의 할 일 조회
/**
 * 예외 처리 필요 - id가 없는 경우
 */
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).send({ message: "Task not found." });
  }

  res.send(task);
});

// 할 일 생성
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title은 필수입니다." });
  }

  const ids = tasks.map((task) => task.id);
  const newTask = {
    id: Math.max(...ids) + 1,
    title,
    isComplete: false,
  };

  tasks.push(newTask);

  res.status(201).send(newTask);
});

app.listen(3000, () => {
  console.log("Server Started");
});
