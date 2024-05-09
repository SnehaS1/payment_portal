import mongoose from "mongoose";

export async function connect() {
  try {
    const mongoUrl = `${process.env.MONGO_URL}${process.env.MONGO_DB}`;
    mongoose.connect(mongoUrl!, {});
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected");
    });
    connection.on("error", (err) => {
      console.error("Database connection failed: ", err);
      process.exit();
    });
  } catch (err) {
    console.error("Something went wrong with the database connection ", err);
  }
}
