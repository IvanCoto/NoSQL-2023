import { Schema, model } from "mongoose";

const ProviderSchema = Schema(
  {
    name: { type: String, required: true, trim: true},
    email: { type: String, required: true, trim: true},
    phone: { type: String, required: true, trim: true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Provider", ProviderSchema);
