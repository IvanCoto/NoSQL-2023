import { config } from "dotenv";

config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@clusterninjadev.cb6dw1c.mongodb.net";
