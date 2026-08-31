import mongoose, { Schema, Document, Model } from "mongoose";

export type WaitlistSource = "wallet" | "sdk";

export const WAITLIST_SOURCES: WaitlistSource[] = ["wallet", "sdk"];

export interface IWaitlist extends Document {
  email: string;
  createdAt: Date;
  ipAddress?: string;
  source?: WaitlistSource;
}

const WaitlistSchema: Schema<IWaitlist> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    ipAddress: {
      type: String,
      required: false,
    },
    // Wallet-era rows predate this field and simply have no source.
    source: {
      type: String,
      enum: WAITLIST_SOURCES,
      default: "sdk",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Waitlist: Model<IWaitlist> =
  mongoose.models.Waitlist || mongoose.model<IWaitlist>("Waitlist", WaitlistSchema);

export default Waitlist;
