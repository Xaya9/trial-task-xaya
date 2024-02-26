"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Ticker, { FinancialTicker } from "nice-react-ticker";

import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoPriceTicker = () => {
  const [ethPrice, setEthPrice] = useState("");
  const [ethLastPrice, setLastEthPrice] = useState("");
  const [ethChange, setEthChange] = useState("");
  const [btcPrice, setBtcPrice] = useState("");
  const [btcLastPrice, setLastBtcPrice] = useState("");
  const [btcChange, setBtcChange] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (coin: string) => {
      if (coin !== "") {
        try {
          const response = await axios.get(`api/priceTicker/${coin}`);
          if (response.data.market_data) {
            setLoading(true);
            const price = response.data.market_data?.current_price?.usd;
            const priceChange =
              response.data.market_data?.price_change_percentage_24h;
            if (coin === "ethereum") {
              if (ethPrice !== "") {
                setLastEthPrice(ethPrice);
              } else {
                const lastPrice =
                  response.data.market_data
                    ?.price_change_percentage_1h_in_currency.usd;
                const lastValue =
                  (1 + parseFloat(lastPrice) / 100) * parseFloat(price);
                setLastEthPrice(lastValue.toFixed(2).toString());
              }
              setEthPrice(price);
              setEthChange(priceChange);
            } else if (coin === "bitcoin") {
              if (btcPrice !== "") {
                setLastBtcPrice(btcPrice);
              } else {
                const lastPrice =
                  response.data.market_data
                    ?.price_change_percentage_1h_in_currency.usd;
                const lastValue =
                  (1 + parseFloat(lastPrice) / 100) * parseFloat(price);
                setLastBtcPrice(lastValue.toFixed(2).toString());
              }
              setBtcPrice(price);
              setBtcChange(priceChange);
            }
          } else {
            setLoading(true);
          }
        } catch (error) {
          console.error("Error fetching chart data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData("ethereum");
    fetchData("bitcoin");

    // Fetch data every 70 seconds
    const intervalId = setInterval(() => {
      fetchData("ethereum");
      fetchData("bitcoin");
    }, 70000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Crypto Price Ticker</CardTitle>
        </CardHeader>
        {!loading ? (
          <CardContent>
            <div className="flex flex-col p-4 mx-3">
              <Ticker>
                <FinancialTicker
                  id={1}
                  change={true}
                  symbol="ETH"
                  lastPrice={ethLastPrice}
                  percentage={ethChange}
                  currentPrice={ethPrice}
                />
                <FinancialTicker
                  id={2}
                  change={true}
                  symbol="BTC"
                  lastPrice={btcLastPrice}
                  percentage={btcChange}
                  currentPrice={btcPrice}
                />
              </Ticker>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <h1>Loading...</h1>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default CryptoPriceTicker;
