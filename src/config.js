import { config } from "dotenv";

config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://ivancototkd:HQB92qPim6ARO6gh@clusterninjadev.cb6dw1c.mongodb.net";
