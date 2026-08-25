import z from "zod";

export const createOrgSchema = z.object({
    name: z.string().trim().min(3, "Name is required").max(100),
    description: z.string().trim().max(500)
})

export const updateOrgSchema = z.object({
    name: z.string().trim().min(2).max(100).optional(),
    description: z.string().trim().max(500).optional()
}).refine((data) => Object.keys(data).length > 0, {
    error: "At least one value must be provided!"
})

export type Role = "MEMBER" | "ADMIN"
export type CreateOrgInput = z.infer<typeof createOrgSchema>
export type UpdateOrgInput = z.infer<typeof updateOrgSchema>