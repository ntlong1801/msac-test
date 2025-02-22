import { NextFunction, Request, Response } from "express";
import ToDoListService from "@services/to-do-list.service";
import { SUCCESS_MESSAGE } from "@utils/common.util";

class ToDoListController {
    private toDoListService: ToDoListService;

    constructor() {
        this.toDoListService = new ToDoListService();
    }

    public getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const toDoList = await this.toDoListService.getAll();
            res.status(200).send(SUCCESS_MESSAGE({ data: toDoList }));
        } catch (error) {
            next(error);
        }
    };

    public getOne = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const toDo = await this.toDoListService.getOne(parseInt(req.params.id));
            res.status(200).send(SUCCESS_MESSAGE({ data: toDo }));
        } catch (error) {
            next(error);
        }
    };

    public create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const newToDo = await this.toDoListService.createToDoList(req.body);
            res.status(201).send(SUCCESS_MESSAGE({ data: newToDo }));
        } catch (error) {
            next(error);
        }
    };

    public update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const updatedToDo = await this.toDoListService.updateToDoList(
                parseInt(req.params.id),
                req.body
            );
            res.status(200).send(SUCCESS_MESSAGE({ data: updatedToDo }));
        } catch (error) {
            next(error);
        }
    };

    public delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.toDoListService.deleteToDoList(parseInt(req.params.id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}

export default new ToDoListController();
