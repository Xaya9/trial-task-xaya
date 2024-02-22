import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: any, context: any) {
  try {
    const address = context.params.address;

    if (!address) {
      return new NextResponse("Missing address", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        address: address,
      },
    });

    if (user) {
      return NextResponse.json(user);
    } else {
      return new NextResponse("User not found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
