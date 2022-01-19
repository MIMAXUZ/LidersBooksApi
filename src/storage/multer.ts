import multer from 'multer';

//const storage = multer.memoryStorage();
// const storage = multer.diskStorage({ destination: './uploads/' });

// const uploader = multer({ storage });

// export default uploader;

const defaultDirectory = './uploads/';

export default {
    directory: defaultDirectory,
    storage: multer.diskStorage( {
        destination: defaultDirectory,
        filename ( request, file, callback ) {
            console.log( request.url );
            const fileName = `uploaded_${file.originalname}`;
            return callback( null, fileName );
        },
    } ),
};