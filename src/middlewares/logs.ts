import { Request, Response, NextFunction } from 'express';

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  console.log('############################', Date());
  console.log('### REQUEST BODY         ###', request.body);
  console.log('### REQUEST URL          ###', request.url);
  console.log('### REQUEST PARAMS       ###', request.params);
  // console.log('### RESPONSE ###', response);
  console.log('############################');
  console.log('   ---------------------');

  return next();
}
