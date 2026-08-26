import * as boardController from "./board.controller"
import { requireAuth } from "../../middlewares/auth.middleware"
import { requireOrgMember } from "../../middlewares/org.middleware"
import { Router } from "express"

const router = Router()

router.use(requireAuth)

router.post("/org/:orgID/board", requireOrgMember, boardController.createBoard);
router.get("/org/:orgID/boards", requireOrgMember, boardController.getBoardsByOrg);
router.get("/:boardID", requireOrgMember, boardController.getBoard);
router.patch("/:boardID", requireOrgMember, boardController.updateBoard);
router.delete("/:boardID", requireOrgMember, boardController.deleteBoard);

export default router
