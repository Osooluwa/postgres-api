import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import itemsRouter from './routes/items.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Mount the router here
app.use('/items', itemsRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
