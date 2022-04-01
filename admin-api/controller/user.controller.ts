import express, { Request, Response } from 'express';
const db = require('../db')

class UserController {
    async getUsers(req: Request, res: Response) {
        try {
            const userType = req.params.userType
            if (!userType) {
                let users = await db.query(`
                    SELECT id, email
                    FROM user_info`
                )
                res.json(users.rows);
            }
            else {
                let users = await db.query(`
                SELECT id, email
                FROM user_info
                JOIN profile on user_info.id = profile.user_id
                WHERE type = $1`,
                    [userType])
                res.json(users.rows);
            }
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async getUserByID(req: Request, res: Response) {
        try {
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
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async getUsersByEmail(req: Request, res: Response) {
        try {
            const email = req.params.email
            const users = await db.query(`
                SELECT id, email
                FROM user_info
                WHERE email ~* ('.*' || $1 || '.*')`,
                [email])
            res.json(users.rows)
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }
}

module.exports = new UserController();