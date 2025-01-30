import { CustomError } from "@/app/utils/customError";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function GET() {
  const prismaClient = new PrismaClient();
  try {
    const languages = await prismaClient.languages.findMany();
    console.log(languages);
    return NextResponse.json({ languages: languages }, { status: 200 });
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
