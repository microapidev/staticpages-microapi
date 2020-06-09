/*
Import this function into your controler to handle all async functions on your route

E.G
asyncHandler(async (req, res, next) => { .... } */

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
