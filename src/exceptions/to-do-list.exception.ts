import { HttpException } from "./common.exception";

export class ToDoListNotFoundException extends HttpException {
  constructor(id: number) {
    super(404, `ToDoList with id ${id} not found`);
  }
}