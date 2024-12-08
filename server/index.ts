import  express from 'express';
import cors from 'cors';

import postRouter from './routes/post'; 
import connectionRouter from './routes/connection'
import reactRouter    from  './routes/react'

const app = express();

app.use(cors());
app.use(express.json());



app.use('/post', postRouter);
app.use('/connect', connectionRouter);
app.use('/react',reactRouter)


// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
