const toXML = require("./../utils/toXML");

/**
 * @param {string} message
 * Response message
 *
 * @param {any} data
 * Payload to be sent
 *
 * @param {boolean} success
 * Request status success
 *
 * Usage in the controller
 * res.status(200).json(response("File added successfuly", {file: "file.png"}, true))
 */

const response = (message, data, success, req, res) => {
  let resp = {
    message: message || null,
    data: data || null,
    success: success == null ? true : success,
  };
  if (req)
    if (req.user.config.responseType == "XML") {
      return toXML(res, resp);
    }

  return resp;
};

module.exports = response;
