import { prisma } from "db/client"
import { type CreateOrgInput, type UpdateOrgInput } from "./org.model"
import { fromPrisma } from "../../utils/fromPrisma"

export const createOrg = (creatorID: string, data: CreateOrgInput) =>
    fromPrisma(() => prisma.org.create({
        data: {
            ...data,
            memberships: {
                create: { userID: creatorID, role: "ADMIN" }
            }
        }
    }))

export const findOrgById = (id: string) =>
    fromPrisma(() => prisma.org.findUnique({ where: { id } }))

export const findOrgByUserId = (userId: string) =>
    fromPrisma(() => prisma.org.findMany({
        where: { memberships: { some: { userID: userId } } },
        orderBy: { name: 'asc' }
    }))

export const updateOrg = (id: string, data: UpdateOrgInput) =>
    fromPrisma(() => prisma.org.update({
        where: { id },
        data
    }))

export const deleteOrg = (id: string) =>
    fromPrisma(() => prisma.org.delete({
        where: { id }
    }))

export const getMembership = (userId: string, orgId: string) =>
    fromPrisma(() => prisma.membership.findUnique({
        where: { userID_orgID: { userID: userId, orgID: orgId } }
    }))
