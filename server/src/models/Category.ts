import { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
});

export default model<ICategory>("Category", categorySchema);
