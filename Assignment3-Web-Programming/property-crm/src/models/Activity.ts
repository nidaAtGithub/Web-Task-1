import mongoose, { Schema, Document, Model } from "mongoose";

export type ActivityAction =
  | "lead_created"
  | "lead_updated"
  | "status_changed"
  | "lead_assigned"
  | "lead_reassigned"
  | "notes_updated"
  | "follow_up_set"
  | "priority_changed";

export interface IActivity extends Document {
  lead: mongoose.Types.ObjectId;
  performedBy: mongoose.Types.ObjectId;
  action: ActivityAction;
  description: string;
  oldValue?: string;
  newValue?: string;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    lead: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
      index: true,
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: [
        "lead_created",
        "lead_updated",
        "status_changed",
        "lead_assigned",
        "lead_reassigned",
        "notes_updated",
        "follow_up_set",
        "priority_changed",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    oldValue: String,
    newValue: String,
  },
  { timestamps: true }
);

const Activity: Model<IActivity> =
  mongoose.models.Activity ||
  mongoose.model<IActivity>("Activity", ActivitySchema);

export default Activity;
