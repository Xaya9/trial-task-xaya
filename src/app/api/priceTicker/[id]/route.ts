import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: any, context: any) {
  try {
    const coin = context.params.id;
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    const { data } = response;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
