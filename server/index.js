import express from "express";
import cors from "cors";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: "URL is required",
      });
    }

    const start = Date.now();

    const response = await axios.get(url, {
      timeout: 10000,
      validateStatus: () => true,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36",
        Accept: "text/html",
      },
    });

    const end = Date.now();

    if (!response.headers["content-type"]?.includes("text/html")) {
      return res.status(400).json({
        error:
          "This website blocks automated requests or does not return standard HTML.",
      });
    }

    const $ = cheerio.load(response.data);

    const title = $("title").text().trim();

    const metaDescription =
      $('meta[name="description"]').attr("content") || "";

    const h1Count = $("h1").length;

    let imagesMissingAlt = 0;

    $("img").each((i, el) => {
      const alt = $(el).attr("alt");

      if (!alt || alt.trim() === "") {
        imagesMissingAlt++;
      }
    });

    const wordCount = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean).length;

    res.json({
      httpStatus: response.status,
      responseTime: `${end - start} ms`,
      title,
      metaDescription,
      h1Count,
      imagesMissingAlt,
      wordCount,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default app;

// Server sirf tab start hoga jab file direct run hogi
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}