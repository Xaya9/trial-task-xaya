import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function AnalogClocks() {
  return (
    <div>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Analog Clock</CardTitle>
          <CardDescription>Display clock</CardDescription>
        </CardHeader>
        <CardContent>
          <p>A clock</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalogClocks;
