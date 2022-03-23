const Joi = require("joi");

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

const postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(4).max(20).required(),
    content: Joi.string().min(4).max(1000).required(),
    important: Joi.string(),
  });

  return schema.validate(data);
};

const utilityBillValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(20).required(),
    recordDate: Joi.date().required(),
    previousTotalDegree: Joi.number().min(0).max(99999).required(),
    currentTotalDegree: Joi.number().min(0).max(99999).required(),
    gas: Joi.number().min(0).max(1000).required(),
    people: Joi.number().min(1).max(10).required(),
    roomA: {
      previousDegree: Joi.number().min(0).max(99999).required(),
      currentDegree: Joi.number().min(0).max(99999).required(),
      desc: Joi.string().min(0).max(100),
    },
    roomB: {
      previousDegree: Joi.number().min(0).max(99999).required(),
      currentDegree: Joi.number().min(0).max(99999).required(),
      desc: Joi.string().min(0).max(100),
    },
    roomC: {
      previousDegree: Joi.number().min(0).max(99999).required(),
      currentDegree: Joi.number().min(0).max(99999).required(),
      desc: Joi.string().min(0).max(100),
    },
    roomD: {
      previousDegree: Joi.number().min(0).max(99999).required(),
      currentDegree: Joi.number().min(0).max(99999).required(),
      desc: Joi.string().min(0).max(100),
    },
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
module.exports.utilityBillValidation = utilityBillValidation;
