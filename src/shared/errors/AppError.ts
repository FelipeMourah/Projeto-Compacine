class AppError {
  public readonly code: number;
  public readonly status: string;
  public readonly message: string;
  constructor(code: number, status: string, message: string) {
    this.code = code;
    this.status = status;
    this.message = message;
  }
}

export default AppError;
