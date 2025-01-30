import { CustomError } from "@/app/utils/customError";
import { PrismaClient } from "@prisma/client";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const prismaClient = new PrismaClient();
  const user_id = jsonwebtoken.decode(body.userInfo);
  try {
    console.log(user_id);
    const findUser = await prismaClient.users.findUnique({
      where: {
        user_id: Number((user_id as JwtPayload)?.id),
      },
      include: {
        verify_token: true,
      },
    });
    if (findUser?.verify_token.token !== body.token) {
      throw new CustomError("Token invalid", 400);
    }
    await prismaClient.users.update({
      where: {
        user_id: Number((user_id as JwtPayload)?.id),
      },
      data: {
        verified: true,
      },
    });
    return NextResponse.json({ redirectTo: `/profile/edit` }, { status: 200 });
  } catch (err) {
    console.log(err);
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
