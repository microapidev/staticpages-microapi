const fs = require("fs");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const apiRes = require("../helpers/apiResponse");

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

const uploadImage = (req, res, next) => {
	try {
		if (!req.files || Object.keys(req.files).length === 0) {
			apiRes.badRequest(res, "No files were uploaded.");
		}
		const { image } = req.files;

		const acceptableMimetypes = [
			"image/png",
			"image/jpg",
			"image/jpeg",
			"image/gif",
		];

		if (!acceptableMimetypes.includes(image.mimetype)) {
			apiRes.badRequest(res, "File isn't an image");
		}

		const imageData = Buffer.from(image.data.toString("base64"), "base64");

		fs.writeFile(`./uploadedImage/${image.name}`, imageData, (error) => {
			if (error) apiRes.errorResponse(res, `An error occured: ${error}`);
		});

		cloudinary.uploader.upload(
			`uploadedImage/${image.name}`,
			// OPTIONS: Don't uncomment unless you know what you are doing
			
			// {
			// 	resource_type: "image",
			// 	public_id: "my_folder/my_sub_folder/my_dog",
			// 	overwrite: true,
			// 	notification_url: "https://mysite.example.com/notify_endpoint",
			// },
			function (error, result) {
				if (error) apiRes.errorResponse(res, `An error occured: ${error}`);

				fs.unlink(`./uploadedImage/${image.name}`, (error) => {
					if (error) apiRes.errorResponse(res, `An error occured: ${error}`);
				});
				apiRes.successResponseWithData(res, "uploaded successfully", result);
			}
		);
	} catch (error) {
		next(error);
	}
};

module.exports = { uploadImage };
