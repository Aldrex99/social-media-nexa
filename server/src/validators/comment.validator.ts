import { body, param, query } from "express-validator";

export const createComment = [
  body("post_id")
    .isMongoId()
    .withMessage("L'ID du post doit être un identifiant MongoDB valide."),
  body("content")
    .isString()
    .withMessage("Le contenu doit être une chaîne de caractères."),
];

export const getComments = [
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

export const deleteComment = [
  param("id")
    .isMongoId()
    .withMessage("L'ID doit être un identifiant MongoDB valide."),
];
