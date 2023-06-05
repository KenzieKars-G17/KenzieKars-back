import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        seller: boolean;
        sub: number;
      };
    }
  }
}
