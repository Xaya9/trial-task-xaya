import axios from "axios";
import { NextResponse } from "next/server";

interface PriceData {
  prices: [number, number][];
}

export async function GET(
  req: any,
  res: any
) {
  try {
    const response = await axios.get<PriceData>(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
    );
    const { data } = response;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
