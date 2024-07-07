export enum AppErrorType {
  TokenExpired = "TokenExpired",
  InvalidOrderState = "InvalidOrderState",
}
class AppError extends Error {
  statusCode: number;
  type: AppErrorType;

  constructor(type: AppErrorType, message: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.type = type;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
export default AppError;
