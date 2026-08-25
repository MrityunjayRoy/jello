import * as orgController from "./org.controller"
import { requireAuth } from "../../middlewares/auth.middleware"
import { Router } from "express"

const router = Router()

router.use(requireAuth)

router.post("/", orgController.createOrg);
router.get("/", orgController.getMyOrgs);
router.get("/:orgId", orgController.getOrg);
router.patch("/:orgId", orgController.updateOrg);
router.delete("/:orgId", orgController.deleteOrg);

export default router
