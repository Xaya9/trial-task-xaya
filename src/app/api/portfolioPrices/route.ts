import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: any, response: any) {
  try {
    const response = await axios.get(
      'https://api.mobula.io/api/1/market/data?asset=bitcoin',
      {
        headers: {
          Authorization: `Bearer ${process.env.MOBULA_KEY}`,
        },
      }
    );
    const { data } = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
