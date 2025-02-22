import { Express } from 'express';

import toDoListRouter from './to-do-list';

export default function router(app: Express) {
  app.use('/to-do-list', toDoListRouter);

}
