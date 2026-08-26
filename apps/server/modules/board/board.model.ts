import z from "zod";

export const createBoardSchema = z.object({
    title: z.string().trim().min(3).max(30),
    orgID: z.uuid()
})

export const updateBoardSchema = z.object({
    title: z.string().trim().min(3).max(30)
})

export const boardIdSchema = z.uuid()
export type CreateBoardInput = z.infer<typeof createBoardSchema>
export type UpdateBoardInput = z.infer<typeof updateBoardSchema>
