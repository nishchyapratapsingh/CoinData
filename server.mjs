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
        const response = await fetch('https://newsdata.io/api/1/crypto?apikey=pub_52446555b2b90de819ab0e8899372b3435249&q=NFT&removeduplicate=1');
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
