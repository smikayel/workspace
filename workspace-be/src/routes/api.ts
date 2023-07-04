import { Router } from 'express'
import authRouter from './AuthRouts'
import Paths from './constants/Paths'
import userRouter from './UserRouts'

// **** Base Routers For Api **** //
const apiRouter = Router()

apiRouter.use(Paths.Users.Base, userRouter)
apiRouter.use(Paths.Auth.Base, authRouter)

export default apiRouter
