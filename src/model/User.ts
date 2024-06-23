import mongoose, { Schema, Document } from "mongoose";

// Message Schema
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Users Info Schema
export interface User extends Document {
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: string;
  isAcceptingMessage: boolean;
  message: Message[];
}
