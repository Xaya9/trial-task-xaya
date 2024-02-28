import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: any, context: any) {
  try {
    const layout_id = parseInt(context.params.id);
    const widget_id = parseInt(context.params.widgetId);

    if (!layout_id || !widget_id) {
      return new NextResponse("Missing layout and widget", { status: 400 });
    }

    const layoutWidget = await prisma.layoutWidget.findUnique({
      where: {
        layout_id_widget_id: {
          layout_id: layout_id,
          widget_id: widget_id,
        },
      },
    });

    if (layoutWidget) {
      return NextResponse.json(layoutWidget);
    } else {
      return new NextResponse("User not found", { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
