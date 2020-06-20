const cloudinary = require("cloudinary").v2;
const apiRes = require("../helpers/apiResponse");

cloudinary.config({
	cloud_name: "sample",
	api_key: "528593969136985",
	api_secret: "JotLNmZkXP7NlpmV4Nd3HWACj0g",
});

const uploadImage = (req, res, next) => {
	try {
		// if (!req.files || Object.keys(req.files).length === 0) {
		// 	apiRes.badRequest(res, "No files were uploaded.");
		// }
		const { image } = req.files;
		console.log(image);


		// const acceptableMimeTypes = ["image/png", "image/jpg", "image/gif"];

		// if (!acceptableMimeTypes.includes(image.mimetype)) {
		// 	apiRes.badRequest(res, "File isn't an image");
		// }

		cloudinary.uploader.upload(
			"image",
			// {
			// 	resource_type: "image",
			// 	public_id: "my_folder/my_sub_folder/my_dog",
			// 	overwrite: true,
			// 	notification_url: "https://mysite.example.com/notify_endpoint",
			// },
			function (error, result) {
				console.log(result, error);
			}
		);
	} catch (error) {
		next(error);
	}
};

module.exports = { uploadImage };
