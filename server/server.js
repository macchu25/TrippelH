import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js';
import { inngest, functions } from './inngest/index.js'
import { serve} from 'inngest/express'
import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import storyRouter from './routes/storyRoutes.js';
import messageRouter from './routes/messageRoutes.js';


const app = express()

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware()) //all request will be authenticated with Clerk

app.get('/', (req, res) => res.send("Server is running"))
app.use('/api/inngest', serve({ client: inngest, functions }));

app.use('/api/user', userRouter);

app.use('/api/post', postRouter)
app.use('/api/story', storyRouter)
app.use('/api/message', messageRouter)

const PORT = process.env.PORT || 4000

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => console.log("Server is running on PORT ", PORT))
    } catch (error) {
        console.error("Failed to start server:", error)
        process.exit(1)
    }
}

startServer()