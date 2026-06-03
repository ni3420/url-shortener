import {z} from "zod"
export const campaignSchema = z.object({
  title: z.string().min(1, "Campaign title is required").max(100, "Title is too long"),
  originalUrl: z.string().min(1, "Destination URL is required").url("Invalid destination URL format"),
  tag: z.string().max(50, "Tag length limit exceeded").optional().or(z.literal("")),
});