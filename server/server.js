const express = require('express');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');
const { errors } = require('celebrate');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/items', itemRoutes);

app.use(errors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
