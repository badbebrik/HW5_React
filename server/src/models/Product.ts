import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  category?: Types.ObjectId | null;
  quantity: number;
  price: number;
  unit: string;
  imageUrl?: string;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  imageUrl: { type: String },
});

export default model<IProduct>("Product", productSchema);
