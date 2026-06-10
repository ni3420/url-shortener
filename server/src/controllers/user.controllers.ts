import type { Response } from "express";
import { AuthenticatedRequest } from "../types";

export const handleGetCurrentUser = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "User profile not found" });
    }

    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};