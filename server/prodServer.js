import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname,'../app/dist')));

// Generic endpoint index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../app/index.html"));
});

app.listen(3000);
