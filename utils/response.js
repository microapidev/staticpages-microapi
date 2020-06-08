/**
 * 
 * 
 * 
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
 * res.status(200).send(response("File added successfuly", {file: "file.png"}, true))
 */

const response = (message, data, success) => {
     return {
       message: message || null,
       data: data || null,
       success: success == null ? true : success,
     };
   }
 
 
 module.exports = response;
 