import { Express } from 'express';

import toDoListRouter from './to-do-list';

export default function router(app: Express) {
  app.use('/api/todos', toDoListRouter);

}
