import { body, param, query } from "express-validator";

export const addLike = [
  body("post_id")
    .isMongoId()
    .withMessage("L'ID du post doit être un identifiant MongoDB valide."),
];

export const getLikes = [
  param("post_id")
    .isMongoId()
    .withMessage("L'ID du post doit être un identifiant MongoDB valide."),
  query("limit")
    .optional()
    .isInt()
    .withMessage("La limite doit être un nombre entier."),
  query("page")
    .optional()
    .isInt()
    .withMessage("La page doit être un nombre entier."),
];

export const removeLike = [
  body("post_id")
    .isMongoId()
    .withMessage("L'ID du post doit être un identifiant MongoDB valide."),
];
