import { Router } from "express";

import ToDoListController from "../controllers/to-do-list.c";
import { dateValidationMiddleware, nameValidationMiddleware } from "../middlewares/toDoListValidation"

const router = Router();

router.get("/", ToDoListController.getAll);

router.get("/:id", ToDoListController.getOne);

router.post("/", nameValidationMiddleware, dateValidationMiddleware, ToDoListController.create);

router.patch("/:id", nameValidationMiddleware, dateValidationMiddleware, ToDoListController.update);

router.delete("/:id", ToDoListController.delete);

export default router;
