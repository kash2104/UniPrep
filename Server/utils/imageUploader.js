const cloudinary = require('cloudinary').v2

exports.uploadImageToCloudinary  = async(file, folder, height, quality) => {
    //the uploaded papers will be inside this folder
    const options = {folder};

    if(height){
        options.height = height
    }

    if(quality){
        options.quality = quality
    }

    options.resource_type = 'auto'
    
    options.max_bytes = 50 * 1024 * 1024

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.deleteImageFromCloudinary = async(publicId) => {
    
    return await cloudinary.uploader.destroy(publicId,{invalidate:true});
    // const options = {invalidate: true};
    // cloudinary.delete_resources([`${publicId}`], options)
    // .then(() => {
    //     console.log('Paper deleted successfully from cloudinary')
    // })
    // .catch((error) => {
    //     console.log('Paper Deletion failed');
    //     console.log('error is: ', error);
    //     process.exit(1);
    // });
}