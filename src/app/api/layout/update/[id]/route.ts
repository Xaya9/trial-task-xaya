import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: any, context: any) {
  let data;
  try {
    const user_id = parseInt(context.params.id);
    try {
      data = await request.json();
    } catch (error) {
      if (request.headers["content-type"] !== "application/json") {
        return new NextResponse("Unsupported Media Type", { status: 415 });
      }
      console.error("Error parsing request body:", error);
      return new NextResponse("Error parsing request body", { status: 400 });
    }

    // Extract data from the request body
    const { layout_name, widgets } = data;

    // Find the layout associated with the user_id
    const existingLayout = await prisma.layout.findFirst({
      where: { user_id: user_id },
      include: { widgets: true },
    });

    if (!existingLayout) {
      return new NextResponse("Layout not found", { status: 404 });
    }

    // Extract existing widget IDs
    const existingWidgetIds = existingLayout.widgets.map(
      (widget) => widget.widget_id
    );

    // Extract widget IDs from the request
    const requestWidgetIds = widgets.map((widget: any) =>
      parseInt(widget.widget_id)
    );

    // Find new widget IDs to be added
    const newWidgetIds = requestWidgetIds.filter(
      (widgetId: number) => !existingWidgetIds.includes(widgetId)
    );

    // Find widget IDs to be deleted
    const widgetsToDelete = existingLayout.widgets.filter(
      (widget) => !requestWidgetIds.includes(widget.widget_id)
    );

    // Update layout
    const updatedLayout = await prisma.layout.update({
      where: { layout_id: existingLayout.layout_id },
      data: {
        layout_name,
        widgets: {
          create: newWidgetIds.map((widgetId: number) => ({
            widget: { connect: { widget_id: widgetId } },
          })),
          deleteMany: widgetsToDelete.map((widget) => ({
            widget_id: widget.widget_id,
          })),
        },
      },
      include: { widgets: true }, // Include widgets in the response
    });

    return NextResponse.json(updatedLayout);
  } catch (error) {
    console.error("Error updating layout:", error);
    return new NextResponse("Error updating layout", { status: 500 });
  }
}
