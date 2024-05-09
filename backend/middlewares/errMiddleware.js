const notFound = (req, res, next) => {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(err);
};

const errHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let msg = err.msg;

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    msg = 'Resource not found';
  }

  res.status(statusCode).json({
    msg,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errHandler };
