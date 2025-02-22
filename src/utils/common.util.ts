import { ISuccessMessage } from "@interfaces/to-do-list";

export const SUCCESS_MESSAGE = <T>({
  statusCode = 200,
  message = "Success",
  data,
}: ISuccessMessage<T>): ISuccessMessage<T> => ({
  statusCode,
  message,
  data,
});
