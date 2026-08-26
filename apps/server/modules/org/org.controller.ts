import type { Request, Response } from "express";
import { createOrgSchema, orgIDSchema, updateOrgSchema } from "./org.model";
import * as orgServices from "./org.service"

export const createOrg = async (req: Request, res: Response): Promise<void> => {
    const input = createOrgSchema.parse(req.body)
    const org = await orgServices.createOrg(req.user!.id, input)

    res.status(201).json({
        'message': "Created Org Sucessfully",
        "data": org
    })
}

export const getMyOrgs = async (req: Request, res: Response): Promise<void> => {
    const orgs = await orgServices.getMyOrgs(req.user!.id)

    res.status(201).json({
        'message': "All orgs by user extracted.",
        "data": orgs
    })
}

export const getOrg = async (req: Request, res: Response): Promise<void> => {
    const orgID = orgIDSchema.parse(req.body)
    const org = await orgServices.getOrg(orgID, req.user!.id)

    res.status(201).json({
        'message': "Org extracted successfully",
        "data": org
    })
}

export const updateOrg = async (req: Request, res: Response): Promise<void> => {
    const orgID = orgIDSchema.parse(req.params.orgId)
    const input = updateOrgSchema.parse(req.body)
    const org = await orgServices.updateOrg(req.user!.id, orgID, input)

    res.status(201).json({
        'message': "Updated Org Successfully",
        "data": org
    })
}

export const deleteOrg = async (req: Request, res: Response): Promise<void> => {
    const orgID = orgIDSchema.parse(req.body)
    await orgServices.deleteOrg(orgID)

    res.status(201).json({
        'message': "Org Deleted successfully",
    })
}