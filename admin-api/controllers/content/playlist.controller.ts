import { Request, Response } from 'express';
const {uploadPathCovers} = require("../../upload");
const db = require('../../db')

interface MulterRequest extends Request {
    file: any;
}

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
            res.json(content.rows)
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async updatePlaylist(req: Request, res: Response) {
        try {
            const multerReq = (req as MulterRequest)
            const filename = multerReq.file ? multerReq.file.filename : "";
            const { id, title, type, user_id } = req.body
            let playlist
            if (filename) {
                let source = uploadPathCovers + `/${filename}`
                playlist = await db.query(`
                    UPDATE playlist
                    SET title = $1, type = $2, img_src = $3, user_id = $4
                    WHERE id = $4
                    RETURNING *
                `, [title, type, source, user_id, id])
            }
            else {
                playlist = await db.query(`
                    UPDATE playlist
                    SET title = $1, type = $2, user_id = $3
                    WHERE id = $4
                    RETURNING *
                `, [title, type, user_id, id])
            }
            res.json(playlist.rows)
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
            const multerReq = (req as MulterRequest)
            const filename = multerReq.file ? multerReq.file.filename : "";
            const { title, type, user_id } = req.body
            const source = uploadPathCovers + `/${filename}`
            let content;
            if (filename){
                content = await db.query(`
                INSERT INTO playlist
                (title, user_id, type, img_src)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `, [title, user_id, type, source])
            }
            else {
                content = await db.query(`
                INSERT INTO playlist
                (title, user_id, type)
                VALUES ($1, $2, $3)
                RETURNING *
            `, [title, user_id, type])
            }
            res.json(content.rows)
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