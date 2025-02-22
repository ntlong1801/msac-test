import { Request, Response, NextFunction } from 'express';
import { HttpException } from 'src/exceptions/common.exception';

const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    success: false,
    status,
    message,
  });
};

export default errorMiddleware;