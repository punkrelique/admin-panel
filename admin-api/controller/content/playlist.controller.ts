import express, { Request, Response } from 'express';
const db = require('../db')

class ContentController {
    async getContent(req: Request, res: Response) {
        try {
            const offset = req.query.offset ?? 0,
                limit = req.query.limit ?? 10,
                type = req.params.type
            let query = `SELECT * FROM ${type} `
            query += `OFFSET ${offset} LIMIT ${limit} `
            const content = await db.query(query)
            res.json(content.rows);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async getContentPlaylistByID(req: Request, res: Response) {
        try {
            const id = req.params.id
            const content = await db.query(`
                SELECT id, title, type
                FROM playlist
                WHERE id = ${id}
            `)
            res.json(content.rows);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async getContentSongByID(req: Request, res: Response) {
        try {
            const id = req.params.id
            const content = await db.query(`
                SELECT id, name
                FROM song
                WHERE id = ${id}
            `)
            res.json(content.rows);
        }
        catch (e) {
            res.status(400).send({
                message: e.message
            });
        }
    }

    async updateContentByID(req: Request, res: Response) {

    }

    async deleteContentByID(req: Request, res: Response) {
        try {
            const id = req.params.id,
                type = req.params.type
            const content = await db.query(`
                DELETE
                FROM ${type}
                WHERE id = ${id}
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

    async addContentPlaylist(req: Request, res: Response) {

    }
}

module.exports = new ContentController();