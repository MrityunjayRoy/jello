import { prisma } from "db/client"
import { updateOrgSchema, type CreateOrgInput, type UpdateOrgInput } from "./org.model"

export const createOrg = async (creatorID: string, data: CreateOrgInput) =>
    await prisma.org.create({
        data: {
            ...data,
            memberships: {
                create: { userID: creatorID, role: "ADMIN" }
            }
        }
    })

export const findOrgById = (id: string) =>
    prisma.org.findUnique({ where: { id } });

export const findOrgByUserId = (userId: string) =>
    prisma.org.findMany({
        where: { memberships: { some: { userID: userId } } },
        orderBy: { name: 'asc' }
    })

export const updateOrg = (id: string, data: UpdateOrgInput) =>
    prisma.org.update({
        where: { id },
        data
    })

export const deleteOrg = (id: string) =>
    prisma.org.delete({
        where: { id }
    })

export const getMembership = (userId: string, orgId: string) =>
    prisma.membership.findUnique({
        where: { userID_orgID: { userID: userId, orgID: orgId } }
    })