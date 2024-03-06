import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Asset {
  asset: {
    name: string;
  };
  price: number;
  token_balance: number;
}

function CryptoPortfolioTracker() {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);
  const [portfolio, setPortfolio] = useState<number | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    async function fetchBitcoinPrice() {
      try {
        const bitcoinResponse = await axios.get("/api/portfolioPrices");

        if (bitcoinResponse.data.price !== 0) {
          setBitcoinPrice(bitcoinResponse.data.price);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    }

    fetchBitcoinPrice();
  }, []);

  const handlePortfolio = async () => {
    try {
      const portfolioResponse = await axios.get(`/api/portfolio/${address}`);

      if (portfolioResponse.data.total_wallet_balance !== 0) {
        setPortfolio(portfolioResponse.data.total_wallet_balance);
        setAssets(portfolioResponse.data.assets);
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  };

  return (
    <div>
      <div>
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Crypto Portfolio Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p>
                <Label htmlFor="email">Bitcoin Price: </Label>
                {bitcoinPrice !== null
                  ? `$${bitcoinPrice.toFixed(2)}`
                  : "Loading..."}
              </p>
            </div>

            <div className="max-w-md flex items-center space-x-4 p-3">
              <Input
                type="text"
                value={address}
                placeholder="Enter your wallet address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button variant="secondary" onClick={handlePortfolio}>
                Get Portfolio
              </Button>
            </div>
              {portfolio !== null && ( `Wallet Balance: $${portfolio.toFixed(2)}` ) }

            <Table>
              <TableCaption>A list of your Assets.</TableCaption>
              <ScrollArea className="h-72 rounded-md border">
                <TableHeader>
                  <TableRow>
                    <TableCell className="w-[100px]">Token Name</TableCell>
                    <TableCell className="text-right">
                      Token Balance
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map(
                    (asset, index) =>
                      asset.token_balance > 0 && (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {asset?.asset.name}
                          </TableCell>
                          <TableCell className="text-right">
                            {asset.token_balance.toFixed(6)}
                          </TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </ScrollArea>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CryptoPortfolioTracker;
