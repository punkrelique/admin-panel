import { Request, Response } from 'express';
const db = require('../../db')

class PlaylistController {
    async getSongs(req: Request, res: Response) {
        try {
            const offset = req.query.offset ?? 0,
                limit = req.query.limit ?? 10
            const content = await db.query(`
                SELECT * FROM song
                OFFSET $1 LIMIT $2
                `, [offset, limit])
            res.json(content.rows);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async getSongByID(req: Request, res: Response) {
        try {
            const id = req.params.id
            const content = await db.query(`
                SELECT id, name
                FROM song
                WHERE id = $1
            `, [id])
            res.json(content.rows);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async deleteSongByID(req: Request, res: Response) {
        try {
            const id = req.params.id
            const content = await db.query(`
                DELETE
                FROM playlist
                WHERE id = $1
                RETURNING *
            `, [id])
            res.json(content.rows);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async addSong(req: Request, res: Response) {
        try {
            const { title, type } = req.body // USER_ID нужен => TODO: сделать авторизацию.
            const content = await db.query(`
                INSERT INTO playlist
                ( title, type ) VALUES
                RETURNING *
            `)
            res.json(content.rows);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async updateSong(req: Request, res: Response) {
        try {
            const { title, name, source } = req.body
            const song = await db.query(`
                UPDATE song
                SET title = ${title}, name = ${name}, source = ${source}
                RETURNING *
            `)
            res.json(song.rows[0]);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }
}

module.exports = new PlaylistController();