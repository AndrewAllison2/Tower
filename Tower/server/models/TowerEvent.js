import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true, minLength: 2, maxLength: 100 },
  description: { type: String, required: true, minLength: 10, maxLength: 1000 },
  coverImg: { type: String, required: true, minLength: 1, maxLength: 300 },
  location: { type: String, required: true, minLength: 1, maxLength: 75 },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })