import { Router } from "express";

import ToDoListController from "../controllers/to-do-list.c";
import { dateCreateToDoValidation, dateUpdateToDoValidation, nameRequiredMiddleware, nameMustBeLessThanMiddleware } from "../middlewares/toDoListValidation"

const router = Router();

router.get("/", ToDoListController.getAll);

router.get("/:id", ToDoListController.getOne);

router.post("/", nameRequiredMiddleware, nameMustBeLessThanMiddleware, dateCreateToDoValidation, ToDoListController.create);

router.patch("/:id", nameMustBeLessThanMiddleware, dateUpdateToDoValidation, ToDoListController.update);

router.delete("/:id", ToDoListController.delete);

export default router;
