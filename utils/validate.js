const Joi = require("@hapi/joi");

module.exports = (data) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(5),
    fileURL: Joi.optional().empty(null),
  });

  return schema.validate(data);
};
