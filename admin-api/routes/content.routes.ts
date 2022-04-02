export {}
const Router = require('express');
const router = new Router();
const playlistController = require('../controller/content/playlist.controller');
const songController = require('../controller/content/song.controller')

router.get('/playlist', playlistController.getPlaylists)
router.get('/playlist/id/:id', playlistController.getPlaylistByID)
// TODO: router.post('/playlist/', playlistController.addPlaylist)
router.put('/playlist', playlistController.updatePlaylist)
router.post('/playlist/id/:id', playlistController.deletePlaylistByID)

router.get('/song', songController.getSongs)
router.get('/song/id/:id', songController.getSongByID)
// TODO: router.post('/content/song/', songController.addSong)
router.put('/song', songController.updateSong)
router.post('/song/id/:id', songController.deleteSongByID)

module.exports = router;