import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function EmbedWidget() {
  return (
    <div>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>EmbedWidget</CardTitle>
          <CardDescription>Display EmbedWidget</CardDescription>
        </CardHeader>
        <CardContent>
          <p>A EmbedWidget</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default EmbedWidget
