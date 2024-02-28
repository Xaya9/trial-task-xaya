import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: any, res: any) {
  let data;
  try {
    data = await req.json();
  } catch (error) {
    if (req.headers["content-type"] !== "application/json") {
      return new NextResponse("Unsupported Media Type", { status: 415 });
    }
    console.error("Error parsing request body:", error);
    return new NextResponse("Error parsing request body", { status: 400 });
  }

  const { address, widget_id, widget_config } = data;

  if (!address || !widget_id || !widget_config) {
    return new NextResponse("Missing address, widget_id, or widget_config", {
      status: 400,
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { address: address },
      include: {
        layout: {
          include: {
            widgets: true,
          },
        },
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const layoutId = user.layout?.layout_id;

    if (!layoutId) {
      return new NextResponse("Layout not found", { status: 404 });
    }

    const layoutWidget = await prisma.layoutWidget.update({
      where: {
        layout_id_widget_id: {
          layout_id: layoutId,
          widget_id: widget_id,
        },
      },
      data: {
        widget_config: widget_config,
      },
    });

    return new NextResponse("LayoutWidget entry updated successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating layoutWidget entry:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
