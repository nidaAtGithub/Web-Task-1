import mongoose, { Schema, Document, Model } from "mongoose";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "In Progress"
  | "Negotiation"
  | "Closed Won"
  | "Closed Lost";
export type LeadPriority = "High" | "Medium" | "Low";
export type LeadSource = "Facebook Ads" | "Walk-in" | "Website" | "Referral" | "Other";
export type PropertyInterest =
  | "Residential Plot"
  | "Commercial Plot"
  | "House"
  | "Apartment"
  | "Farm House"
  | "Shop"
  | "Office"
  | "Warehouse";

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  propertyInterest: PropertyInterest;
  location?: string;
  budget: number; // in PKR (millions)
  status: LeadStatus;
  priority: LeadPriority;
  score: number;
  notes?: string;
  source: LeadSource;
  assignedTo?: mongoose.Types.ObjectId;
  followUpDate?: Date;
  lastActivityAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    propertyInterest: {
      type: String,
      required: [true, "Property interest is required"],
      enum: [
        "Residential Plot",
        "Commercial Plot",
        "House",
        "Apartment",
        "Farm House",
        "Shop",
        "Office",
        "Warehouse",
      ],
    },
    location: {
      type: String,
      trim: true,
    },
    budget: {
      type: Number,
      required: [true, "Budget is required"],
      min: [0, "Budget cannot be negative"],
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Negotiation", "Closed Won", "Closed Lost"],
      default: "New",
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
    },
    score: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: ["Facebook Ads", "Walk-in", "Website", "Referral", "Other"],
      default: "Other",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    followUpDate: {
      type: Date,
    },
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Rule-based scoring logic (middleware)
LeadSchema.pre("save", function (next) {
  if (this.isModified("budget") || this.isNew) {
    const budgetInMillions = this.budget;

    if (budgetInMillions > 20) {
      this.score = 90;
      this.priority = "High";
    } else if (budgetInMillions >= 10) {
      this.score = 60;
      this.priority = "Medium";
    } else {
      this.score = 30;
      this.priority = "Low";
    }
  }
  next();
});

// Index for efficient queries
LeadSchema.index({ assignedTo: 1, status: 1 });
LeadSchema.index({ priority: 1 });
LeadSchema.index({ createdAt: -1 });

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
