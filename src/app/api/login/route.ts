import { CustomError } from "@/app/services/customError";
import { PasswordServices } from "@/app/services/passwordServices";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const prismaClient = new PrismaClient();
  try {
    console.log(body);
    if (!body.email || !body.password) {
      throw new CustomError("Information incompleted", 400);
    }
    const workerLogin = await prismaClient.workers.findFirst({
      where: {
        email: body.email,
      },
    });
    if (!workerLogin) {
      throw new CustomError("User not found", 404);
    }
    const compare = await PasswordServices.comparePassword(
      body.password,
      workerLogin?.password ?? ""
    );
    console.log(workerLogin);
    if (!compare) {
      throw new CustomError("Password doesnt match", 400);
    }
    return NextResponse.json({ succes: "Loged in" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: (err as CustomError).message },
      { status: (err as CustomError).code }
    );
  }
}
