import express from 'express';
import { connectToMongo } from './connections/mongo.connection';
import { registerRoutes } from './routes/route';
export const startServer = async () => {
  try {
    const app = express();
    const { PORT } = process.env;
    await connectToMongo();
    registerRoutes(app);
    app.listen(PORT || 3000, () =>
      console.log(`Server started at: ${PORT}`)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
