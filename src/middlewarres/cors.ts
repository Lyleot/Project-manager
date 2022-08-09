import express from 'express';

export default (req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void  => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control=Allow-Methods', 'GET, PATCH, POST');

    return res.json({});
  }

  next();
};
