# 🌐 Page Pulse – Website SEO & Performance Analyzer

Built for Digital Heroes Training Task

Live Demo:
https://digital-heroes-task-opal.vercel.app/

Backend API:
https://digitalheroes-task-production.up.railway.app/analyze

GitHub Repository:
https://github.com/SnehavarshneyDev/DigitalHeroes-Task

---

## Overview

Page Pulse is a simple website analysis tool that accepts a URL and generates a basic SEO and performance report.

The application is divided into two parts:

- Frontend (Vercel)
- Backend API (Railway)

The frontend sends a URL to the backend API, which fetches the webpage, analyzes it, and returns a structured JSON report.

---

## Features

- Analyze any public website
- HTTP Status Code
- Response Time
- Page Title
- Meta Description
- H1 Count
- Images Missing Alt Text
- Approximate Word Count
- Invalid URL Handling
- Timeout Handling
- Non-HTML Response Handling

---

## Tech Stack

Frontend
- HTML
- CSS
- JavaScript
- Vite

Backend
- Node.js
- Express.js
- Axios
- Cheerio

Deployment
- Vercel
- Railway

---

## Installation

Clone the repository

```bash
git clone https://github.com/SnehavarshneyDev/DigitalHeroes-Task.git
```

Install dependencies

```bash
npm install
```

Start frontend

```bash
npm run dev
```

Start backend

```bash
node server/index.js
```

---

## API Contract

### Endpoint

```
POST /analyze
```

### Request

```json
{
  "url":"https://developer.mozilla.org"
}
```

### Successful Response

```json
{
  "httpStatus":200,
  "responseTime":"89 ms",
  "title":"MDN Web Docs",
  "metaDescription":"...",
  "h1Count":1,
  "imagesMissingAlt":0,
  "wordCount":1264
}
```

### Error Response

```json
{
  "error":"URL is required"
}
```

---

## Testing

Run tests

```bash
npm test
```

Covered Test Cases

- Missing URL
- Invalid URL
- Successful Website Analysis

---

## Design Decisions

### 1. Express + Cheerio

Cheerio was used because it provides fast HTML parsing without requiring a browser engine.

---

### 2. Separate Frontend and Backend

The frontend is hosted on Vercel while the API is deployed on Railway. This makes deployment simpler and keeps responsibilities separated.

---

### 3. Graceful Error Handling

Instead of crashing, the API returns meaningful messages for:

- Invalid URLs
- Timeouts
- Non-HTML responses
- Missing request data

This improves user experience and makes debugging easier.

---

## Future Improvements

If I had one more day, I would add:

- Lighthouse Performance Score
- SEO Score
- Accessibility Score
- Broken Link Detection
- Open Graph Analysis
- Structured Data Validation
- Downloadable PDF Reports

---

## Author

Sneha Varshney

GitHub:
https://github.com/SnehavarshneyDev

LinkedIn:
https://linkedin.com/in/snehavarshney2134

---

Built for Digital Heroes Training Task

https://digitalheroesco.com