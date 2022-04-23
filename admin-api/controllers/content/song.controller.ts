import { Request, Response } from 'express'
const {uploadPathSongs} = require("../../upload")
const db = require('../../db')

interface MulterRequest extends Request {
    file: any;
}

class SongController {
    async getSongs(req: Request, res: Response) {
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
            const { filename } = (req as MulterRequest).file
            const { userId, name } = req.body
            const source = uploadPathSongs + `/${filename}`
            const content = await db.query(`
                INSERT INTO song
                (name, user_id, source)
                VALUES ($1, $2, $3)
                RETURNING *
            `, [name, userId, source])
            res.json(content.rows[0]);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async updateSong(req: Request, res: Response) {
        try {
            const { filename } = (req as MulterRequest).file
            const { title, name } = req.body
            const source = uploadPathSongs + `/${filename}`
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

    async addSongToPlaylistByID(req: Request, res: Response) {
        try {
            const { idS, idP } = req.params
            const song = await db.query(`
                INSERT
                INTO playlist_song (playlist_id, song_id)
                VALUES ($1, $2)
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

    async getSongsByName(req: Request, res: Response) {
        try {
            const offset = req.query.offset,
                limit = req.query.limit,
                name = req.params.name

            if (!offset)
                res.status(400).send({
                    message: "Offset query param is missing"
                })
            if (!limit)
                res.status(400).send({
                    message: "Limit query param is missing"
                })

            const users = await db.query(`
                SELECT id, name
                FROM song
                WHERE name ~* ('.*' || $1 || '.*')
                OFFSET $2 LIMIT $3`, [name, offset, limit])
            res.json(users.rows)
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }
}

module.exports = new SongController();