import express, { Request, Response } from 'express';
const db = require('../db')

class UserController {
    async getUsers(req : Request, res: Response) {
        const users = await db.query('SELECT * FROM user_info')
        res.json(users.rows);
    }
    async getUserInfo(req : Request, res: Response) {
        const id = req.params.id
        const user = await db.query(`
                SELECT a.id, a.email, c.username, c.type AS user_type, c.birthday,
                    c.country, b.type as premium_type, b.start_at, b.end_at
                FROM user_info AS a
                JOIN premium as b on a.id = b.user_id
                JOIN profile as c on a.id = c.user_id
                WHERE a.id = $1;`,
            [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController();