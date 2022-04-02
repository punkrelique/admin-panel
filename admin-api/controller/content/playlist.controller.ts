import { Request, Response } from 'express';
const db = require('../../db')

class PlaylistController {
    async getPlaylists(req: Request, res: Response) {
        try {
            const offset = req.query.offset ?? 0,
                limit = req.query.limit ?? 10
            const content = await db.query(`
                SELECT * FROM playlist
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

    async getPlaylistByID(req: Request, res: Response) {
        try {
            const id = req.params.id
            const content = await db.query(`
                SELECT *
                FROM playlist
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

    async updatePlaylist(req: Request, res: Response) {
        try {
            const { id, title, type, source } = req.body
            const song = await db.query(`
                UPDATE playlist
                SET title = $1, type = $2, img_src = $3
                WHERE id = $4
                RETURNING *
            `, [title, type, source, id])
            res.json(song.rows);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async deletePlaylistByID(req: Request, res: Response) {
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

    async addPlaylist(req: Request, res: Response) {
        // USER_ID нужен => TODO: сделать авторизацию.
    }
}

module.exports = new PlaylistController();