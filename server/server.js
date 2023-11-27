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

app.patch('/users/:userId', async (req, res) => {
  const data = await fs.readFile(dataRoute, 'utf8');
  const { users } = JSON.parse(data);
  const userId = parseInt(req.params.userId);
  const user = users.find(user => user.id === userId);

  if (user) {
    user.name = req.body.name;
    await fs.writeFile(dataRoute, JSON.stringify({ users }), 'utf8');
    return res.send({ state: "DONE" });
  } else {
    return res.status(404).send({ state: 'User not found' });
  }
});

app.put('/users/:userId', async (req, res) => {
  const data = await fs.readFile(dataRoute, 'utf8')
  const { users } = JSON.parse(data);
  const userId = parseInt(req.params.userId);
  const user = users.find((user) => user.id === userId);

  if (user) {
    user.name = req.body.name;
    user.id = req.body.id;
    await fs.writeFile(dataRoute, JSON.stringify({ users }), 'utf8');
    return res.send({ state: "DONE" });
  } else {
    return res.status(404).send({ state: 'User not found' });
  }
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/script.js"));
});

app.delete('/users/:userId', async (req, res) => {
  const data = await fs.readFile(dataRoute, 'utf8');
  const { users } = JSON.parse(data);
  const userId = parseInt(req.params.userId);
  const user = users.find(user => user.id === userId);

  if (user) {
    const newUsers = users.filter((x) => x !== user);
    await fs.writeFile(dataRoute, JSON.stringify({ users: newUsers }), 'utf8');
    return res.send({ state: "DONE" });
  } else {
    return res.status(404).send({ state: 'User not found' });
  }
});

app.post('/users', async (req, res) => {
  const data = await fs.readFile(dataRoute, 'utf8');
  const { users } = JSON.parse(data);
  const userIds = users.map(user => user.id);
  const maxId = Math.max(...userIds);
  const newUser = {
    name: req.body.name,
    id: maxId + 1
  }
  users.push(newUser);
  await fs.writeFile(dataRoute, JSON.stringify({ users }), 'utf8');
  return res.send({ state: "DONE" });
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