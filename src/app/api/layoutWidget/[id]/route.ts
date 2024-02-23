import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: any, context: any) {
  try {
    const layout_id = parseInt(context.params.id);

    if (!layout_id) {
      return new NextResponse("Missing address", { status: 400 });
    }

    const layoutWidget = await prisma.layoutWidget.findMany({
      where: {
        layout_id: layout_id,
      },
    });

    if (layoutWidget) {
      return NextResponse.json(layoutWidget);
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
