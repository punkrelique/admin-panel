import { Request, Response } from 'express';
const db = require('../../db')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config')

class PlaylistController {
    async getPlaylists(req: Request, res: Response) {
        try {
            const offset = req.query.offset,
                limit = req.query.limit

            if (!offset)
                res.status(400).send({
                    message: "Offset query param is missing"
                })
            if (!limit)
                res.status(400).send({
                    message: "Limit query param is missing"
                })
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
        try {
            const token = req.headers.authorization?.split(' ')[1]
            const userId = jwt.verify(token, secret)['id']
            const { title, type, img_src, user_id } = req.body;
            const content = await db.query(`
                INSERT INTO playlist
                (title, user_id, type, img_src)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `, [title, user_id ?? userId, type, img_src])
            res.json(content.rows);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async getSongsFromPlaylistByID(req: Request, res: Response) {
        try {
            const id = req.params.id,
                offset = req.query.offset,
                limit = req.query.limit

            if (!offset)
                res.status(400).send({
                    message: "Offset query param is missing"
                })
            if (!limit)
                res.status(400).send({
                    message: "Limit query param is missing"
                })

            const content = await db.query(`
                SELECT a.id, a.name
                FROM song as a
                JOIN playlist_song as b on a.id = b.song_id
                WHERE playlist_id = $1
            `, [id])
            res.json(content.rows);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async removeSongFromPlaylistByID(req: Request, res: Response) {
        try {
            const { idS, idP } = req.params
            const song = await db.query(`
                DELETE
                FROM playlist_song
                WHERE playlist_id = $1 AND song_id = $2
                RETURNING *
            `, [idP, idS])
            res.json(song.rows[0]);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async getPlaylistsByTitle(req: Request, res: Response) {
        try {
            const offset = req.query.offset,
                limit = req.query.limit,
                title = req.params.title

            if (!offset)
                res.status(400).send({
                    message: "Offset query param is missing"
                })
            if (!limit)
                res.status(400).send({
                    message: "Limit query param is missing"
                })

            const content = await db.query(`
                SELECT id, title, type
                FROM playlist
                WHERE title ~* ('.*' || $1 || '.*')
                OFFSET $2 LIMIT $3`, [title, offset, limit])
            res.json(content.rows)
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }
}

module.exports = new PlaylistController();