const express = require('express')
const authMiddleware = require('./middleware/authMiddleware')
const userRouter = require('./routes/user.routes')
const contentRouter = require('./routes/content.routes')
const authRouter = require('./routes/auth.routes')
const PORT = process.env.PORT || 8080


const app = express()
app.use(express.json());
app.use('/api/user',authMiddleware, userRouter)
app.use('/api/content', authMiddleware, contentRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))