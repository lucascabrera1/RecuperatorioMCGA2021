import { Router } from 'express';

import usuario from './users.js'
import auth from './auth.js'

const router = Router()

router.use('/', usuario)
router.use('/', auth)

export default router