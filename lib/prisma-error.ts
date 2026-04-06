import { Prisma } from "@prisma/client";

export function prismaErrorMessage(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return `[${error.code}] ${error.message}`;
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}
