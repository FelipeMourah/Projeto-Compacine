class AppError {
  public readonly code: number;
  public readonly status: string;
  public readonly message: string;
  public readonly details?: string[];
  constructor(
    code: number,
    status: string,
    message: string,
    details: string[] = [],
  ) {
    this.code = code;
    this.status = status;
    this.message = message;
    this.details = details;
  }
}

export default AppError;
