import type { Request, Response } from "express";
import { createOrgSchema, orgIDSchema, updateOrgSchema } from "./org.model";
import * as orgServices from "./org.service"
import { ValidationError, type AppError, type Result } from "errors"

const sendError = (res: Response, error: AppError) => {
    res.status(error.status).json({
        error: error.message,
        code: error.code,
        ...(error.details !== undefined ? { details: error.details } : {}),
    })
}

const parseOrSend = <T>(
    parsed: { success: true; data: T } | { success: false; error: { issues: unknown } },
    res: Response,
): T | undefined => {
    if (!parsed.success) {
        sendError(res, new ValidationError({ details: parsed.error.issues }))
        return undefined
    }
    return parsed.data
}

const handleResult = <T>(res: Response, result: Result<T>, successStatus = 200, message = "Success") => {
    if (!result.success) {
        sendError(res, result.error)
        return
    }
    res.status(successStatus).json({
        message,
        data: result.data,
    })
}

export const createOrg = async (req: Request, res: Response): Promise<void> => {
    const input = parseOrSend(createOrgSchema.safeParse(req.body), res)
    if (input === undefined) return
    const result = await orgServices.createOrg(req.user!.id, input)
    handleResult(res, result, 201, "Created Org Sucessfully")
}

export const getMyOrgs = async (req: Request, res: Response): Promise<void> => {
    const result = await orgServices.getMyOrgs(req.user!.id)
    handleResult(res, result, 200, "All orgs by user extracted.")
}

export const getOrg = async (req: Request, res: Response): Promise<void> => {
    const orgID = parseOrSend(orgIDSchema.safeParse(req.body), res)
    if (orgID === undefined) return
    const result = await orgServices.getOrg(orgID, req.user!.id)
    handleResult(res, result, 200, "Org extracted successfully")
}

export const updateOrg = async (req: Request, res: Response): Promise<void> => {
    const orgID = parseOrSend(orgIDSchema.safeParse(req.params.orgId), res)
    if (orgID === undefined) return
    const input = parseOrSend(updateOrgSchema.safeParse(req.body), res)
    if (input === undefined) return
    const result = await orgServices.updateOrg(req.user!.id, orgID, input)
    handleResult(res, result, 200, "Updated Org Successfully")
}

export const deleteOrg = async (req: Request, res: Response): Promise<void> => {
    const orgID = parseOrSend(orgIDSchema.safeParse(req.body), res)
    if (orgID === undefined) return
    const result = await orgServices.deleteOrg(orgID)
    if (!result.success) {
        sendError(res, result.error)
        return
    }
    res.status(204).json({
        message: "Org Deleted successfully",
    })
}
