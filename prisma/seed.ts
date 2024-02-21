const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedWidgets() {
  try {
    await prisma.widget.create({
      data: {
        widget_name: "Analog Clocks",
        widget_description: "Analog clock widgets that support multiple time zones",
        widget_config: {
          time_zones: ["GMT", "EST", "IST"],
        },
      },
    });

    await prisma.widget.create({
      data: {
        widget_name: "Embed Widget",
        widget_description: "Embed external pages",
        widget_config: {
          urls: ["https://blockchain.news/", "https://www.tmforum.org/blockchain/"],
        },
      },
    });

    await prisma.widget.create({
      data: {
        widget_name: "Quotes",
        widget_description: "Display inspirational quotes in a widget",
        widget_config: {
          quote_source: "type.fit/api/quotes",
          custom_quotes: [
            {
              text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
              author: "Thomas Edison"
            },
            {
              text: "You can observe a lot just by watching.",
              author: "Yogi Berra"
            }
          ]
        },
      },
    });

    await prisma.widget.create({
      data: {
        widget_name: "RSS News Reader",
        widget_description: "fetch news from specified RSS sources",
        widget_config: {
          rss_feed_urls: ["https://example.com/feed1", "https://example.com/feed2"],
        },
      },
    });

    await prisma.widget.create({
      data: {
        widget_name: "Crypto StockChart",
        widget_description: "Displays cryptocurrency price charts",
        widget_config: {
          cryptocurrency: "BTC",
          chart_type: "line_chart",
        },
      },
    });

    await prisma.widget.create({
      data: {
        widget_name: "Crypto Price Ticker",
        widget_description: "Display real-time prices of major cryptocurrencies",
        widget_config: {
          cryptocurrencies: ["BTC", "ETH"],
        },
      },
    });

    await prisma.widget.create({
      data: {
        widget_name: "Crypto Portfolio Tracker",
        widget_description: " fetch real-time prices and calculate portfolio value",
        widget_config: {
          tracked_cryptocurrencies: ["BTC", "ETH"],
        },
      },
    });

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedWidgets();
