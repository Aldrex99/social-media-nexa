import { Request, NextFunction, Response } from "express";

export const checkRole = (acceptedRole: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole) {
      res.status(401).json({
        code: 401,
        message: "Vous n'êtes pas autorisé à accéder à cette ressource",
      });
      return;
    }

    if (!acceptedRole.includes(userRole)) {
      res.status(403).json({
        code: 403,
        message: "Vous n'êtes pas autorisé à accéder à cette ressource",
      });
      return;
    }

    next();
  };
};
