// RSSNewsReader.js
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRSSFeed } from "@/lib/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon } from "@radix-ui/react-icons"

interface FeedItem {
  title?: string;
  link: string;
}

function RSSNewsReader() {
  const [feedUrls, setFeedUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState<string>("");
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState<number>(3);

  useEffect(() => {
    const fetchFeedForUrls = async () => {
      try {
        const feedPromises = feedUrls.map((url) => getRSSFeed(url));
        const feeds = await Promise.all(feedPromises);
        const allItems = feeds.flat();
        setFeedItems(allItems);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };

    fetchFeedForUrls();
  }, [feedUrls]);

  const handleAddUrl = () => {
    setFeedUrls([...feedUrls, newUrl]);
    setNewUrl("");
  };

  const handleRemoveUrl = (index: number) => {
    const updatedUrls = [...feedUrls];
    updatedUrls.splice(index, 1);
    setFeedUrls(updatedUrls);
  };

  const handleLoadMore = () => {
    setDisplayedItems(displayedItems + 3);
  };

  return (
    <div>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>RSS News Reader</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center m-3">
            <div className="max-w-sm flex items-center space-x-2">
              <Input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Enter RSS feed URL"
              />
              <Button variant="secondary" onClick={handleAddUrl}>
                Add URL
              </Button>
            </div>
          </div>
          <div>
            <p>RSS Feed URLs</p>
            <ul>
              {feedUrls.map((url, index) => (
                <li key={index} className="flex items-center p-2">
                  <span>{url}</span>
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveUrl(index)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p>RSS Feed</p>
            <ul>
              {feedItems.slice(0, displayedItems).map((item, index) => (
                <li key={index}>
                  <a href={item.link} style={{ textDecoration: "underline" }}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
            {displayedItems < feedItems.length && (
              <Button variant="outline" size="icon" onClick={handleLoadMore}>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RSSNewsReader;
