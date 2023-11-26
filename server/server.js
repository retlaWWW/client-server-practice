import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/edit", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/edit/:userId", (req, res) => {
  const userId = req.params.userId;

  const userData = getUserData(userId);

  if (userData) {
    res.json(userData);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/script.js"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function getUserData(userId) {
  const users = {
    1: { id: 1, name: "Daddy" },
    2: { id: 2, name: "Accord" },
  };

  return users[userId];
}