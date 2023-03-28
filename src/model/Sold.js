import mongoose from "mongoose";
const { Schema } = mongoose;

const SoldSchema = Schema(
  {
    prevSold: { type: Schema.Types.ObjectId, ref: "Sold" },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Producto vendido
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, trim: true },
    amount: { type: Number, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export default mongoose.model("Sold", SoldSchema);
