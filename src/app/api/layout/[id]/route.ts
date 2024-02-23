import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: any, context: any) {
  try {
    const user_id = parseInt(context.params.id);

    if (!user_id) {
      return new NextResponse("Missing address", { status: 400 });
    }

    const layout = await prisma.layout.findUnique({
      where: {
        user_id: user_id,
      },
    });

    if (layout) {
      return NextResponse.json(layout);
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
