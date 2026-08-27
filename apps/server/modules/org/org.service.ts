import * as orgRepos from "./org.repo"
import type { CreateOrgInput, Role, UpdateOrgInput } from "./org.model"
import { err, NotFoundError, UnauthorizedError, type Result } from "errors";

const assertRole = async (
    userID: string,
    orgID: string,
    _roles: Role[],
): Promise<Result<void>> => {
    const membership = await orgRepos.getMembership(userID, orgID);
    if (!membership.success || !membership.data) {
        return err(new UnauthorizedError())
    }
    return { success: true, data: undefined }
}

export const createOrg = (userID: string, input: CreateOrgInput) =>
    orgRepos.createOrg(userID, input)

export const updateOrg = async (userID: string, orgID: string, input: UpdateOrgInput) => {
    const auth = await assertRole(userID, orgID, ["ADMIN"])
    if (!auth.success) return auth
    return orgRepos.updateOrg(orgID, input)
}

export const getMyOrgs = (userID: string) =>
    orgRepos.findOrgByUserId(userID)

export const getOrg = async (orgID: string, userID: string) => {
    const auth = await assertRole(userID, orgID, ["ADMIN", "MEMBER"])
    if (!auth.success) return auth
    const org = await orgRepos.findOrgById(orgID)
    if (!org.success || !org.data) {
        return err(new NotFoundError({ message: "Organization with OrgID doesnt exists!" }))
    }
    return org
}

export const deleteOrg = (orgID: string) =>
    orgRepos.deleteOrg(orgID)
