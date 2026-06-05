import {z} from "zod"

export const CreateLinkSchema=z.object({
    urls: z
       .string()
       .min(1, { message: "URL is required" })
       .url({ message: "Please enter a valid URL" }),
})

export const utmSchema = z.object({
  baseUrl: z.string().url("Please enter a valid website URL (e.g., https://example.com)"),
  source: z.string().min(1, "Campaign source is required (e.g., google, newsletter)"),
  medium: z.string().min(1, "Campaign medium is required (e.g., cpc, email, social)"),
  name: z.string().min(1, "Campaign name is required (e.g., summer_sale)"),
  term: z.string().optional(),
  content: z.string().optional(),
});

export type CreateLinkFormInput=z.infer<typeof CreateLinkSchema>