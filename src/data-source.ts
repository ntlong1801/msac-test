import { DataSource } from "typeorm";
import { ToDoList } from "./entities/to-do-list.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./database.sqlite",
  entities: [ToDoList],
  synchronize: true,
  // logging: true,
});

export const getConnection = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
