import { Router } from 'express';

import usuario from './users.js'
import auth from './auth.js'
import ping from '../Controllers/home.js';

const router = Router()

router.use('/', usuario)
router.use('/', auth)
router.route('/').get(ping)

export default router