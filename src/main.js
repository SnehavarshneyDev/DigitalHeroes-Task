import "./style.css";

document.querySelector("#app").innerHTML = `
<div class="container">
    <h1>🌐 Page Pulse</h1>

    <p class="subtitle">
        Website SEO & Performance Analyzer
    </p>

    <input
        type="text"
        id="url"
        placeholder="https://example.com"
    />

    <button id="analyzeBtn">
        Analyze Website
    </button>

    <div id="result"></div>
</div>
`;

const button = document.getElementById("analyzeBtn");

button.addEventListener("click", async () => {

    const url = document.getElementById("url").value;

    const result = document.getElementById("result");

    if (!url) {
        result.innerHTML = "<p>Please enter a URL.</p>";
        return;
    }

    result.innerHTML = "<p>Analyzing...</p>";

    try {

        const response = await fetch("https://digitalheroes-task-production.up.railway.app/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (data.error) {

            result.innerHTML = `
                <p style="color:red;">
                    ${data.error}
                </p>
            `;

            return;
        }

        result.innerHTML = `
            <div class="card">

                <h2>${data.title}</h2>

                <p><strong>HTTP Status:</strong> ${data.httpStatus}</p>

                <p><strong>Response Time:</strong> ${data.responseTime}</p>

                <p><strong>Meta Description:</strong> ${data.metaDescription}</p>

                <p><strong>H1 Count:</strong> ${data.h1Count}</p>

                <p><strong>Images Missing Alt:</strong> ${data.imagesMissingAlt}</p>

                <p><strong>Word Count:</strong> ${data.wordCount}</p>

            </div>
        `;

    } catch (err) {

        result.innerHTML = `
            <p style="color:red;">
                Server Error
            </p>
        `;
    }

});
document.querySelector("#app").insertAdjacentHTML(
  "beforeend",
  `
<footer class="footer">
    Built for
    <a
      href="https://digitalheroesco.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      Digital Heroes Training Task
    </a>
</footer>
`
);