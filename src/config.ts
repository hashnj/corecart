import dotenv from "dotenv";

dotenv.config(); 

export const B_Url = process.env.BACKEND_URL || "http://localhost:3300";
export const F_URL = process.env.FRONTEND_URL || "http://localhost:5173";
export const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY || "";
