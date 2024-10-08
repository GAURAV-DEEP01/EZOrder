import dotenv from "dotenv";
dotenv.config();
import app from "./app";

const PORT = process.env.PORT || 9000;

export const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
