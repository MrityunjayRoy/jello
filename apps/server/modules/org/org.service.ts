import * as orgRepos from "./org.repo"
import type { CreateOrgInput, Role, UpdateOrgInput } from "./org.model"

const assertRole = async (userID: string, orgID: string, roles: Role[]) => {
    const membership = await orgRepos.getMembership(userID, orgID);
}

export const createOrg = (userID:string, input: CreateOrgInput) => 
    orgRepos.createOrg(userID, input)

export const updateOrg = async (userID: string, orgID: string, input: UpdateOrgInput) => {
    await assertRole(userID, orgID, ["ADMIN"])
    return orgRepos.updateOrg(orgID, input)
}

export const getMyOrgs = (userID: string) =>
    orgRepos.findOrgByUserId(userID)

export const getOrg = async (orgID:string, userID: string) => {
    await assertRole(userID, orgID, ["ADMIN", "MEMBER"])
    const org = await orgRepos.findOrgById(orgID)
    if(!org) {

    }
    return org
}

export const deleteOrg = (orgID: string) =>
    orgRepos.deleteOrg(orgID)

