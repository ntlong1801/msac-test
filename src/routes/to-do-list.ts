import { Router } from "express";

import ToDoListController from "../controllers/to-do-list.c";
import { dateValidationMiddleware } from "@middlewares/dateValidation";

const router = Router();

router.get("/", ToDoListController.getAll);

router.get("/:id", ToDoListController.getOne);

router.post("/", dateValidationMiddleware, ToDoListController.create);

router.patch("/:id", dateValidationMiddleware, ToDoListController.update);

router.delete("/:id", ToDoListController.delete);

export default router;
