import express from "express";
import authRouter from "./routes/auth.js";
import sequelize from "./db/config.js";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const docs = YAML.load("./docs/api.yaml");

app.use("/api", swaggerUI.serve, swaggerUI.setup(docs));

sequelize
    .sync({ alter: true })
    .then(() => console.log("DB connected successfully"))
    .catch(err => console.error(err));

app.use("/auth", authRouter);
app.listen(4002, () => console.log("http://localhost:4002"));