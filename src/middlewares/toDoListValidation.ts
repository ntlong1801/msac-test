import { Request, Response, NextFunction } from "express";
import {
  HttpException,
  InvalidDateException,
} from "../exceptions/common.exception";

interface DateValidationRules {
  requireStartDate?: boolean;
  requireBothDates?: boolean;
}

const MAX_NAME_LENGTH = 80;
const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const validateDateFormat = (date: string): boolean => {
  if (!DATE_FORMAT_REGEX.test(date)) {
    throw new InvalidDateException("Date format must be YYYY-MM-DD");
  }
  
  const timestamp = new Date(date).getTime();
  if (isNaN(timestamp)) {
    throw new InvalidDateException("Invalid date format (YYYY-MM-DD)");
  }
  
  return true;
};

const validateDateRange = (startDate: string, endDate: string): void => {
  const startDateTime = new Date(startDate).getTime();
  const endDateTime = new Date(endDate).getTime();
  
  if (endDateTime < startDateTime) {
    throw new InvalidDateException("End date cannot be before start date");
  }
};

const validateDates = (
  startDate: string | undefined,
  endDate: string | undefined,
  rules: DateValidationRules
): void => {
  if (rules.requireStartDate && endDate && !startDate) {
    throw new InvalidDateException("Start date is required");
  }

  if (startDate) {
    validateDateFormat(startDate);
  }

  if (endDate) {
    validateDateFormat(endDate);
  }

  if (startDate && endDate) {
    validateDateRange(startDate, endDate);
  }
};

const dateCreateToDoValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { startDate, endDate } = req.body;
  validateDates(startDate, endDate, { requireStartDate: true });
  next();
};

const dateUpdateToDoValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { startDate, endDate } = req.body;
  validateDates(startDate, endDate, {});
  next();
};

const nameRequiredMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name } = req.body;
  if (!name) {
    throw new HttpException(400, "Name is required");
  }
  next();
};

const nameMustBeLessThanMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name } = req.body;
  if (name?.length > MAX_NAME_LENGTH) {
    throw new HttpException(
      400,
      `Name must be less than ${MAX_NAME_LENGTH} characters`
    );
  }
  next();
};

export {
  dateCreateToDoValidation,
  dateUpdateToDoValidation,
  nameRequiredMiddleware,
  nameMustBeLessThanMiddleware,
};
