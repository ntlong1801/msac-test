import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ToDoList {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({
        name: 'name',
        length: 80
    })
    name!: string;
    
    @Column({
        name: 'start_date',
        type: "date",
        nullable: true
    })
    startDate?: Date;
    
    @Column({
        name: 'end_date',
        type: "date",
        nullable: true
    })
    endDate?: Date;
}