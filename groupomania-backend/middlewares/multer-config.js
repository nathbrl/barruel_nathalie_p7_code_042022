const  multer = require('multer');

//liste des formats de fichiers autorisés
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/bmp': 'bmp',
    'image/gif': 'gif',
    'image/ico': 'ico',
    'image/svg': 'svg',
    'image/tiff': 'tiff',
    'image/tif': 'tif',
    'image/webp': 'webp'
};

//stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split('').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, Date.now() + '.' + extension);
    },
});

module.exports = multer({ storage }).single('image');