import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./database.sqlite",
  entities: [User],
  synchronize: true,
  logging: true,
});
