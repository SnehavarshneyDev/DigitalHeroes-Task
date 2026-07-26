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
    });
    console.log(response.headers["content-type"]);

    const end = Date.now();

    if (
      !response.headers["content-type"]?.includes("text/html")
    ) {
      return res.status(400).json({
  error:
    "This website blocks automated requests or does not return standard HTML.",
});

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
      .split(" ").filter(Boolean).length;

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

app.listen(5000, () => {
  console.log(" Server running on http://localhost:5000");
});