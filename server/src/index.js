import { app, server } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("App Error: ", error);
    });
    server.on("error", (error) => {
      console.log("Server Error: ", error);
    });
    server.listen(process.env.PORT || 3000, () => {
      console.log(`\n Server is running on PORT: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection failed!! ", error);
  });
