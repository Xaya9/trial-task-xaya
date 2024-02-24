"use client";

import { Topbar } from "@/app/components/Topbar";
import { useAccount } from "wagmi";
import { useState, useEffect, useMemo, Fragment } from "react";
import axios from "axios";
import { LayoutDetails } from "./components/LayoutDetails";
import type { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import AnalogClocks from "./components/AnalogClocks";
import EmbedWidget from "./components/EmbedWidget";
import Quotes from "./components/Quotes";
import RSSNewsReader from "./components/RSSNewsReader";
import CryptoStockChart from "./components/CryptoStockChart";
import CryptoPriceTicker from "./components/CryptoPriceTicker";
import CryptoPortfolioTracker from "./components/CryptoPortfolioTracker";

interface User {
  user_id: number;
  name: string;
  email: string;
  address: string;
}

export default function Home() {
  const { isConnected, address } = useAccount();
  const [user, setUser] = useState<User | null>(null);
  const allItems = useSelector((state: RootState) => state.item.items);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (address) {
      // Fetch user details based on the address
      axios
        .get(`/api/profile/${address}`)
        .then((response) => {
          const userData = response.data;
          setUser(userData);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setUser(null);
          } else {
            console.error("Error fetching user details:", error);
          }
        });
    }
  }, [address, allItems]);

  useEffect(() => {
    if (reload) {
      window.location.reload();
    }
  }, [reload]);

  const handleLayoutUpdate = () => {
    setReload(true);
  };

  const chunkedItems = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < allItems.length; i += 2) {
      chunks.push(allItems.slice(i, i + 2));
    }
    return chunks;
  }, [allItems]);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1">
        {/* Top Bar */}
        <header className="bg-gray-900 text-black py-4 px-8 flex justify-end gap-3">
          {user && <LayoutDetails user_id={user.user_id} onLayoutUpdate={handleLayoutUpdate} />}
          <Topbar />
        </header>

        {/* Page Content */}
        <div className="p-8">
          {address && isConnected ? (
            <>
              {user ? (
                <div className="p-3 text-center">
                  <h1>Hello {user?.name} </h1>
                  <h1> Welcome to your DashBoard! </h1>
                  <div className="grid grid-cols-2 gap-4">
                    {chunkedItems.map((chunk, index) => (
                      <div key={index} className="grid grid-cols-1 gap-4">
                        {chunk.map((item) => (
                          <Fragment key={item}>
                            {item === "1" && <AnalogClocks />}
                            {item === "2" && <EmbedWidget />}
                            {item === "3" && <Quotes />}
                            {item === "4" && <RSSNewsReader />}
                            {item === "5" && <CryptoStockChart />}
                            {item === "6" && <CryptoPriceTicker />}
                            {item === "7" && <CryptoPortfolioTracker />}
                          </Fragment>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <h1 className="text-center">
                  Kindly create your Profile to access your Dashboard!
                </h1>
              )}
            </>
          ) : (
            <h1 className="text-center">
              Kindly connect your wallet in profile to access your Dashboard!
            </h1>
          )}
        </div>
      </main>
    </div>
  );
}
