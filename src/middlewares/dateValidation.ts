import { Request, Response, NextFunction } from 'express';
import { InvalidDateException } from '../exceptions/common.exception';

export const dateValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { startDate, endDate } = req.body;

    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (endDate && !startDate) { 
        throw new InvalidDateException('Start date is required');
    }

    if (startDate && endDate) {
        if (!dateFormatRegex.test(startDate) || !dateFormatRegex.test(endDate)) {
            throw new InvalidDateException('Date format must be YYYY-MM-DD');
        }

        const startDateTime = new Date(startDate).getTime();
        const endDateTime = new Date(endDate).getTime();

        if (isNaN(startDateTime) || isNaN(endDateTime)) {
            throw new InvalidDateException('Invalid date format');
        }

        if (endDateTime < startDateTime) {
            throw new InvalidDateException('End date cannot be before start date');
        }
    }

    next();
};