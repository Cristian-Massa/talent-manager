export class CustomError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

try {
  throw new CustomError("Algo salió mal", 404);
} catch (error) {
  console.log("Código del error:", (error as CustomError).code);
  console.log("Mensaje del error:", (error as CustomError).message);
}
