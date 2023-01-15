import express from 'express';
import UsersCtrl from './users.controller.js';

const router = express.Router();

router.route('/').get((req, res) => res.send('hello world'));

router
    .route('/users')
    /* .post(UsersCtrl.apiPostUser)
    .put(UsersCtrl.apiUpdateUser)
    .delete(UsersCtrl.apiDeleteUser); */

export default router;