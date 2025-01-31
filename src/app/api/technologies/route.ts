import { CustomError } from "@/app/utils/customError";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function GET() {
  const prismaClient = new PrismaClient();
  try {
    const technologies = await prismaClient.technologies.findMany();
    console.log(technologies);
    return NextResponse.json({ technologies: technologies }, { status: 200 });
  } catch (error) {
    if (typeof (error as CustomError).code !== "number") {
      return NextResponse.json(
        { error: (error as CustomError).message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: (error as CustomError).message },
      { status: (error as CustomError).code }
    );
  }
}
