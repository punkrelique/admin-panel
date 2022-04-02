export {}
const Router = require('express');
const router = new Router();
const playlistController = require('../controller/content/playlist.controller');
const songController = require('../controller/content/song.controller')

router.get('/playlist', playlistController.getPlaylists)
router.get('/playlist/:id', playlistController.getPlaylistByID)
router.post('/playlist', playlistController.addPlaylist)
router.put('/playlist', playlistController.updatePlaylist)
router.post('/playlist/:id', playlistController.deletePlaylistByID)
router.get('/playlist/:id/songs', playlistController.getSongsFromPlaylistByID)
router.get('/playlist/:idP/song/:idS', playlistController.removeSongFromPlaylistByID)

router.get('/song', songController.getSongs)
router.get('/song/:id', songController.getSongByID)
router.post('/song', songController.addSong)
router.put('/song', songController.updateSong)
router.post('/song/:id', songController.deleteSongByID)
router.post('/song/:idS/playlist/:idP', songController.addSongToPlaylistByID)

module.exports = router;