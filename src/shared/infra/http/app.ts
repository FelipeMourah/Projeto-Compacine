import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running in PORT: ${PORT}`);
});
