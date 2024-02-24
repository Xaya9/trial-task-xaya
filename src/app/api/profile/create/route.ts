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

  const { name, email, address } = data;

  if (!name || !email || !address) {
    return new NextResponse("missing  name, email! or connect wallet", {
      status: 400,
    });
  }

  const exist = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });

  if (exist) {
    const updatedUser = await prisma.user.update({
      where: {
        address: address,
      },
      data: {
        name: name,
        email: email,
      },
    });

    return NextResponse.json(updatedUser);
  } else {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        address,
      },
    });

    return NextResponse.json(user);
  }
}
