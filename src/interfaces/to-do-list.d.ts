export interface ToDoList {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface ISuccessMessage<T> {
  statusCode?: number;
  message?: string;
  data?: T;
}
