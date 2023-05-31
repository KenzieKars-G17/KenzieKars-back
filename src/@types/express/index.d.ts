import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        admin: boolean,
        sub: number
      };
    }
  }
}
