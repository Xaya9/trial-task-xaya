import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CryptoStockChart() {
  return (
    <div>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>CryptoStockChart</CardTitle>
          <CardDescription>Display CryptoStockChart</CardDescription>
        </CardHeader>
        <CardContent>
          <p>A CryptoStockChart</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default CryptoStockChart
