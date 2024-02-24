import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Quotes() {
  return (
    <div>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Quotes</CardTitle>
          <CardDescription>Display Quotes</CardDescription>
        </CardHeader>
        <CardContent>
          <p>A Quote</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Quotes
