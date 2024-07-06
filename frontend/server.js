import express from 'express';
const app = express();
import path from 'path';

const port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () =>
    console.log(`Server is running on: http://localhost:${port}`));