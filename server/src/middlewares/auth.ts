import type { Response, NextFunction } from "express";
import { getAuth, createClerkClient } from "@clerk/express";
import UserModel from "../models/user.models";
import type { AuthenticatedRequest } from "../types";

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function requireAuthAndSync(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized access token" });
    }

    let dbUser = await UserModel.findOne({ clerkId: userId });

    if (!dbUser) {
      const clerkUser = await clerkClient.users.getUser(userId);
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();

      if (!email) {
        return res.status(400).json({ success: false, message: "Clerk email mapping unavailable" });
      }

      dbUser = await UserModel.findOneAndUpdate(
        { clerkId: userId },
        { 
          $set: { 
            clerkId: userId, 
            email, 
            name: name || "Anonymous User" 
          } 
        },
        { upsert: true, new: true, runValidators: true }
      );
    }

    req.user = {
      id: dbUser._id.toString(),
      clerkId: dbUser.clerkId,
      email: dbUser.email,
      name: dbUser.name,
    };

    return next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal application authorization fault" });
  }
}