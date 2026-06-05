import {z} from "zod"
export const campaignSchema = z.object({
  title: z.string().min(1, "Campaign title is required").max(100, "Title is too long"),
  tag: z.string().max(50, "Tag length limit exceeded").optional().or(z.literal("")),
});


export const CreateLinkSchema = z.object({
  title: z.string().min(1, "Link identifying title is required"),
  originalUrl: z.string().url("Please enter a valid target URL layout (e.g., https://...)"),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type CreateLinkInput = z.infer<typeof CreateLinkSchema>;