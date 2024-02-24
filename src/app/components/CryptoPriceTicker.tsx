import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CryptoPriceTicker() {
  return (
    <div>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>CryptoPriceTicker</CardTitle>
          <CardDescription>Display CryptoPriceTicker</CardDescription>
        </CardHeader>
        <CardContent>
          <p>A CryptoPriceTicker</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default CryptoPriceTicker
