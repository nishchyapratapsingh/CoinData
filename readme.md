# CoinData

CoinData is a web application that fetches and displays the latest news about cryptocurrencies. It uses the NewsData.io API to retrieve news articles related to Bitcoin and presents them in a simple and clean interface.

## Features

- Fetches the latest news about Bitcoin from NewsData.io.
- Displays news articles with titles, descriptions, and links to full articles.
- Easy to set up and deploy locally.

## Prerequisites

- Node.js (v16 or later)
- npm (Node Package Manager)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/coindata.git
cd coindata
```

### 2. Install Dependencies

Make sure you have Node.js and npm installed. Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Set Up the Server

#### Update `server.mjs`

Replace `YOUR_NEWS_API_KEY` in `server.mjs` with your actual NewsData.io API key. Ensure the `server.mjs` file looks like this:

```javascript
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

// Endpoint to serve static files
app.use(express.static('public'));

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// News endpoint
app.get('/news', async (req, res) => {
    try {
        const response = await fetch('https://newsdata.io/api/1/news?apikey=pub_52446555b2b90de819ab0e8899372b3435249&q=Bitcoin');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data.results);
    } catch (error) {
        console.error('Error fetching Bitcoin news:', error);
        res.status(500).send('Failed to fetch news');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

### 4. Create HTML and JavaScript

Ensure you have an `index.html` file in the `public` directory. Here is a basic example of `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CoinData</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        #news-container {
            padding: 20px;
        }
        .news-item {
            margin-bottom: 20px;
        }
        .news-item h3 {
            margin: 0;
        }
        .news-item p {
            margin: 5px 0 0;
        }
        .news-item a {
            color: #007bff;
            text-decoration: none;
        }
        .news-item a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div id="news-container">
        <h2>Crypto News</h2>
        <p>Stay informed with the latest news in the cryptocurrency world.</p>
    </div>

    <script>
        async function fetchNews() {
            try {
                const response = await fetch('/news');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const newsContainer = document.getElementById('news-container');
                data.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item');
                    newsItem.innerHTML = `
                        <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
                        <p>${article.description}</p>
                    `;
                    newsContainer.appendChild(newsItem);
                });
            } catch (error) {
                console.error('Failed to fetch news:', error);
                document.getElementById('news-container').innerHTML = 'Failed to load news';
            }
        }

        // Fetch news on page load
        fetchNews();
    </script>
</body>
</html>
```

### 5. Run the Server

Start the server with the following command:

```bash
node server.mjs
```

Visit `http://localhost:3000` in your browser to view the application.

## Troubleshooting

- **CORS Issues:** If you face CORS issues, ensure your API key and request headers are correctly set up.
- **Module Errors:** Make sure all dependencies are correctly installed and imported. Use `npm install` to ensure all modules are available.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
