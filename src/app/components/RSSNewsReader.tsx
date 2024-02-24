import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function RSSNewsReader() {
  return (
    <div>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>RSSNewsReader</CardTitle>
          <CardDescription>Display RSSNewsReader</CardDescription>
        </CardHeader>
        <CardContent>
          <p>A RSSNewsReader</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default RSSNewsReader
