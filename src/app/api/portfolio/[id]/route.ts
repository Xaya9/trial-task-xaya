import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: any, context: any) {
  try {
    const address = context.params.id
    const response = await axios.get(
      `https://api.mobula.io/api/1/wallet/portfolio?wallet=${address}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MOBULA_KEY}`,
        },
      }
    );
    const { data } = response.data;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching wallet portfolio:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
