import { PasswordServices } from "@/app/services/passwordServices";
import { CustomError } from "@/app/utils/customError";
import { signToken } from "@/app/utils/jsonwebtoken";
import { sendConfirmationRegister } from "@/app/utils/mailing/sendConfirmationRegister";
import { verificationToken } from "@/app/utils/verificationToken";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const prismaClient = new PrismaClient();
  console.log(body);
  try {
    if (!body.email || !body.password) {
      throw new CustomError("Information incompleted", 400);
    }
    const userFind = await prismaClient.users.findFirst({
      where: {
        email: body.email,
      },
    });
    if (userFind?.user_id) {
      throw new CustomError("User already exists", 400);
    }

    const hashedPassword = await PasswordServices.hashPassword(body.password);
    const verifyToken = verificationToken();

    const register = await prismaClient.users.create({
      data: {
        email: body.email,
        password: hashedPassword,
        role: "user",
        verified: false,
        verify_token: {
          create: {
            token: verifyToken.token,
            expires_at: verifyToken.verifyTokenExpiration,
          },
        },
      },
    });

    if (!register.user_id) {
      throw new CustomError("Error creating user", 400);
    }

    const userToken = signToken({ id: register.user_id });
    await sendConfirmationRegister(userToken, verifyToken.token, body.email);

    return NextResponse.json(
      { redirectTo: `/register/${userToken}` },
      { status: 200 }
    );
  } catch (err) {
    console.log((err as CustomError).message);
    if (typeof (err as CustomError).code !== "number") {
      return NextResponse.json(
        { error: (err as CustomError).message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: (err as CustomError).message },
      { status: (err as CustomError).code }
    );
  }
}
