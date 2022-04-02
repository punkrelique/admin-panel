import { Request, Response } from 'express';
const db = require('../db')

class UserController {
    async getUsers(req: Request, res: Response) {
        try {
            const offset = req.query.offset ?? 0,
                  limit = req.query.limit ?? 10,
                  userType = req.query.userType
            let query = `
                        SELECT id, email
                        FROM user_info
                        JOIN profile ON user_info.id = profile.user_id `
            if (userType)
                query += `WHERE type = ${db.escape(userType)} `

            query += `OFFSET $1 LIMIT $2 `
            const users = await db.query(query, [offset, limit])
            res.json(users.rows);
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
            const offset = req.query.offset ?? 0,
                limit = req.query.limit ?? 10,
                userType = req.query.userType,
                email = req.params.email

            let query = `
                SELECT id, email
                FROM user_info as a `

            if (userType)
                query += ` 
                    JOIN profile as b ON a.id = b.user_id
                    WHERE email ~* ('.*' || '${db.escape(email)}' || '.*') 
                    AND b.type = '${db.escape(userType)}' `
            else {
                query += `WHERE email ~* ('.*' || '${db.escape(email)}' || '.*')`
            }

            query += ` OFFSET $1 LIMIT $2`
            const users = await db.query(query, [offset, limit])
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