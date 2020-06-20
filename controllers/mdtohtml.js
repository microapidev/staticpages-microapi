const showdown = require("showdown");
const apiRes = require("../helpers/apiResponse");

exports.convert = (req, res, next) => {
	try {
		const { string } = req.body;

		if (!string) {
			apiRes.badRequest(res, "markdown string wasn't provided");
		}
		const converter = new showdown.Converter();
		const md = converter.makeHtml(string);
		apiRes.successResponseWithData(
			res,
			"successfully converted html to md",
			md
		);
	} catch (error) {
		next(error);
	}
};
