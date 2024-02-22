"use client";

import { Topbar } from "@/app/components/Topbar";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  user_id: number;
  name: string;
  email: string;
  address: string;
}

export default function Home() {
  const { isConnected, address } = useAccount();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (address) {
      // Fetch user details based on the address
      axios
        .post("/api/profile", { address })
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
  }, [address]);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1">
        {/* Top Bar */}
        <header className="bg-gray-900 text-white py-4 px-8">
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
                </div>
              ) : (
                <h1 className="text-center">
                  Kindly create your Profile to access your Dashboard!
                </h1>
              )}
            </>
          ) : (
            <h1 className="text-center">
              Kindly connect your wallet to access your Dashboard!
            </h1>
          )}
        </div>
      </main>
    </div>
  );
}
