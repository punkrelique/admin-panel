import { Request, Response } from 'express';
const jwt = require('jsonwebtoken')
const { secret } = require('../../config')
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
            const { userId, name, src } = req.body;
            const content = await db.query(`
                INSERT INTO song
                (name, user_id, source)
                VALUES ($1, $2, $3)
                RETURNING *
            `, [name, userId, src])
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
}

module.exports = new PlaylistController();