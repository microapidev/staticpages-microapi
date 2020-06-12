const convert = require("xml-js");

module.exports = (res, data) => {
  data = JSON.stringify(data);
  res.set("Content-Type", "text/xml");
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  return convert.json2xml(data, options);
};
