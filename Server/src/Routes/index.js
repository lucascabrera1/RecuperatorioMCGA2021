import { Router } from 'express';

import usuario from './users.js'

const router = Router()

router.use('/usuarios', usuario)

export default router