import { Router } from 'express';

import usuario from './users.js'

const router = Router()

router.use('/', usuario)

export default router