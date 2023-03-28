import { Schema, model } from "mongoose";

const ClientSchema = Schema(
  {
    name: { type: String, required: true, trim: true},
    lastName: { type: String, required: true, trim: true},
    email: { type: String, required: true, trim: true, unique: true},
    phone: { type: String, required: true, trim: true},
    gender: { type: String, required: true, trim: true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Client", ClientSchema);
