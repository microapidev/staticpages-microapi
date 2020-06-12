const convert = require('xml-js');

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

const response = (message, data, success, req) => {
  const resp = {
    message: message || null,
    data: data || null,
    success: success == null ? true : success,
  };

  if (req && req.user && req.user.responseType == "XML"){
    const options = {compact: true, ignoreComment: true, spaces: 4};
    return convert.json2xml(resp, options);
  }
  
  return resp
}


module.exports = response;
