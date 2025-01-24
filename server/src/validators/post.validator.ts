import { body, param, query } from "express-validator";

export const createPost = [
  body("content")
    .isString()
    .withMessage("Le contenu doit être une chaîne de caractères."),
  body("imageLink")
    .optional()
    .isString()
    .withMessage("Le lien de l'image doit être une chaîne de caractères."),
];

export const getPost = [
  param("id")
    .isMongoId()
    .withMessage("L'ID doit être un identifiant MongoDB valide."),
];

export const getPosts = [
  query("limit")
    .optional()
    .isInt()
    .withMessage("La limite doit être un nombre entier."),
  query("page")
    .optional()
    .isInt()
    .withMessage("La page doit être un nombre entier."),
];

export const getPostsByUser = [
  param("id")
    .isMongoId()
    .withMessage("L'ID doit être un identifiant MongoDB valide."),
  query("limit")
    .optional()
    .isInt()
    .withMessage("La limite doit être un nombre entier."),
  query("page")
    .optional()
    .isInt()
    .withMessage("La page doit être un nombre entier."),
];

export const deletePost = [
  param("id")
    .isMongoId()
    .withMessage("L'ID doit être un identifiant MongoDB valide."),
];
