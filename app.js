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

app.listen(3000, () => {
  console.log("Server Started");
});
