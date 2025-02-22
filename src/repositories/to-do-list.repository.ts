import { Repository } from "typeorm";
import { ToDoList } from "@entities/to-do-list.entity";
import { getConnection } from "../data-source";

export const getToDoListRepository = async (): Promise<Repository<ToDoList>> => {
    const connection = await getConnection();

    return connection.getRepository(ToDoList);
}