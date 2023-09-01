import express from 'express';

const app = express();
const port = 3333;

app.get('/', (req, res) => {
  res.send('Express')
});

const start = async() => {
  try {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch(e) {
    console.log('Error', e)
  }
};

start();