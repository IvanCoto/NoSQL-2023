import mongoose from "mongoose";
const { Schema } = mongoose;

const BillSchema = Schema(
  {
    amount: { type: Number, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export default mongoose.model("Bill", BillSchema);
