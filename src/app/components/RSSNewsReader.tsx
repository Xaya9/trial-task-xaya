"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRSSFeed } from "@/lib/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useAccount } from "wagmi";

interface FeedItem {
  title?: string;
  link: string;
}

interface DetailsProps {
  user_id: number;
}

function RSSNewsReader({ user_id }: DetailsProps) {
  const { address } = useAccount();
  const [feedUrls, setFeedUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState<string>("");
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState<number>(3);

  useEffect(() => {
    const fetchFeedForUrls = async () => {
      try {
        if (user_id) {
          console.log(user_id);
          const layoutResponse = await axios.get(`/api/layout/${user_id}`);
          const layoutData = layoutResponse.data;
          const layoutId = layoutData.layout_id;
          console.log(layoutId);
          const widgetResponse = await axios.get(
            `/api/layoutWidget/${layoutId}/${4}`
          );
          const widgetData = widgetResponse.data;
          const rssFeedUrls = widgetData.widget_config?.rss_feed_urls || [];
          setFeedUrls(rssFeedUrls);
          const feedPromises = rssFeedUrls.map((url: any) => getRSSFeed(url));
          const feeds = await Promise.all(feedPromises);
          const allItems = feeds.flat();
          setFeedItems(allItems);
        }
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };

    fetchFeedForUrls();
  }, [user_id]);

  const handleAddUrl = async () => {
    try {
      const updatedFeedUrls = [...feedUrls, newUrl];
      setFeedUrls(updatedFeedUrls);
      setNewUrl("");

      const widgetData = {
        address: address,
        widget_id: 4,
        widget_config: {
          rss_feed_urls: updatedFeedUrls,
        },
      };
      await axios.put("/api/RSSFeed", widgetData);

      toast({
        title: "Your RSS feed saved!",
        description: "Your RSS feeds are added!",
      });
    } catch (error) {
      console.error("Error saving RSS feed:", error);
    }
  };

  const handleRemoveUrl = async (index: number) => {
    try {
      const updatedFeedUrls = [...feedUrls];
      updatedFeedUrls.splice(index, 1);
      setFeedUrls(updatedFeedUrls);

      const widgetData = {
        address: address,
        widget_id: 4,
        widget_config: {
          rss_feed_urls: updatedFeedUrls,
        },
      };
      await axios.put("/api/RSSFeed", widgetData);

      toast({
        title: "Your RSS feed saved!",
        description: "Your RSS feeds are added!",
      });
    } catch (error) {
      console.error("Error saving RSS feed:", error);
    }
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
                <li key={index} className="flex items-center space-x-2 p-2">
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
