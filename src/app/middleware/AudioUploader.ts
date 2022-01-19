import moment from 'moment';
import multer from 'multer';

const defaultDirectory = './uploads/';

export default {
    directory: defaultDirectory,
    storage: multer.diskStorage( {
        destination: defaultDirectory,
        filename ( request, file, callback ) {
            console.log( request );
            const FileNameInfo = `uploaded_${moment( new Date() ).format("x")}${file.originalname}`;
            return callback( null, FileNameInfo );
        },
    } ),
};
