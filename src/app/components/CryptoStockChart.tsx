"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";

interface PriceData {
  prices: [number, number][];
}

function CryptoStockChart() {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      backgroundColor: string;
      borderColor: string;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get<PriceData>("/api/stockChart");
        const { prices } = response.data;
        const chartLabels = prices.map((price) =>
          new Date(price[0]).toLocaleDateString()
        );
        const chartData = {
          labels: chartLabels,
          datasets: [
            {
              label: "Bitcoin Price (USD)",
              data: prices.map((price) => price[1]),
              fill: false,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        };
        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>CryptoStockChart</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default CryptoStockChart;
