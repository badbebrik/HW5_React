import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import { errorHandler } from "./utils/errorHandler";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
var morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mywarehouse";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Warehouse API",
      version: "1.0.0",
      description: "API для управления категориями и товарами.",
    },
  },
  apis: ["./src/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
