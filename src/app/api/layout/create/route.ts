import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: any) {
  let data;
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
  const { user_id, layout_name, widgets } = data;

  if (!user_id || !layout_name || !widgets) {
    return new NextResponse("missing  name, email! or connect wallet", {
      status: 400,
    });
  }

  // check if exists
  const exist = await prisma.layout.findUnique({
    where: {
      user_id: user_id,
    },
  });

  // create layout
  if (exist) {
    return new NextResponse("Layout already exist", { status: 404 });
  } else {
    const layout = await prisma.layout.create({
      data: {
        layout_name,
        user: { connect: { user_id } },
        widgets: {
          create: widgets.map((widget: any) => ({
            widget: { connect: { widget_id: widget.widget_id } },
          })),
        },
      },
    });

    return NextResponse.json(layout);
  }
}
