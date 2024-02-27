import { useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function EmbedWidget() {
  const [url, setUrl] = useState("");
  const [sanitizedUrl, setSanitizedUrl] = useState("");

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const sanitizeUrl = (url: string): string | null => {
    const urlRegex = /^(https?):\/\/([^\s$.?#].[^\s]*)$/;
    if (!urlRegex.test(url)) {
      return null;
    }
    return url;
  };

  const embedContent = async () => {
    try {
      const sanitizeTheUrl = sanitizeUrl(url);
      if (!sanitizeTheUrl) {
        toast({
          title: "Invalid URL, Please check it properly!",
          description: url,
        });
      } else {
        setSanitizedUrl(sanitizeTheUrl);
        toast({
          title: "URL Embedded!",
          description: url,
        });
      }
    } catch (error) {
      console.error("Error embedding content:", error);
    }
  };

  return (
    <div>
      <Card className="w-[800px]">
        <CardHeader>
          <CardTitle>Embed Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="max-w-sm flex items-center space-x-2">
              <Input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="Enter URL"
              />
              <Button variant="secondary" onClick={embedContent}>Embed</Button>
            </div>
          </div>
          {sanitizedUrl && (
            <div>
              <iframe
                title="Embedded Content"
                src={sanitizedUrl}
                style={{ width: "100%", height: "400px", border: "none" }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default EmbedWidget;
