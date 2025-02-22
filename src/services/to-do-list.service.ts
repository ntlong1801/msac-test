import { toDoListDto } from '@dto/to-do-list.dto';
import { ToDoList } from '@entities/to-do-list.entity';
import { getToDoListRepository } from '@repositories/to-do-list.repository';
import { ToDoListNotFoundException } from '@exceptions/to-do-list.exception';
import { Repository } from 'typeorm';

export default class ToDoListService {
    toDoListRepository!: Repository<ToDoList>;

    constructor() {
        this.initializeRepository();
    }

    async initializeRepository() {
        this.toDoListRepository = await getToDoListRepository();
    }

    async getAll(): Promise<ToDoList[]> {
        return await this.toDoListRepository.find();
    }

    async getOne(id: number): Promise<ToDoList> { 
        const toDo = await this.toDoListRepository.findOne({where: {id}});

        if (!toDo) {
            throw new ToDoListNotFoundException(id);
        }

        return toDo;
    };

    async createToDoList(dto: toDoListDto): Promise<ToDoList> {

        const newToDoList = new ToDoList();
        newToDoList.name = dto.name;
        if (dto.startDate) newToDoList.startDate = dto.startDate;
        if (dto.endDate) newToDoList.endDate = dto.endDate;

        return await this.toDoListRepository.save(newToDoList);
    }

    async updateToDoList(id: number, dto: toDoListDto): Promise<ToDoList> { 
        const toDoList = await this.getOne(id);

        toDoList.name = dto.name;
        if (dto.startDate) toDoList.startDate = dto.startDate;
        if (dto.endDate) toDoList.endDate = dto.endDate;

        return await this.toDoListRepository.save(toDoList);
    }

    async deleteToDoList(id: number): Promise<void> { 
        await this.toDoListRepository.delete(id);
    }

}
