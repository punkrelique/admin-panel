const multer = require('multer');

const uploadPathCovers = 'assets/uploads/covers'
const uploadPathSongs = 'assets/uploads/songs'

const filenameSetter = (req: any, file: any, cb: any) => {
    cb(
        null,
        new Date().valueOf() +
        '_' +
        file.originalname
    );
}

const storageCovers = multer.diskStorage({
    destination: function(req: any, file: any, cb: any) {
        cb(null, uploadPathCovers);
    },
    filename: filenameSetter
})

const storageSongs = multer.diskStorage({
    destination: function(req: any, file: any, cb: any) {
        cb(null, uploadPathSongs);
    },
    filename: filenameSetter
})

const imageUpload = multer({ storage: storageCovers }).single("cover");
const songUpload = multer({ storage: storageSongs }).single("song");

export {
    imageUpload,
    songUpload,
    uploadPathCovers,
    uploadPathSongs,
}