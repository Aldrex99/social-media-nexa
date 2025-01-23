import { body, param } from "express-validator";

export const getTodo = [
  param("id").isMongoId().withMessage("Identifiant invalide."),
];

export const createTodo = [
  body("title")
    .isString()
    .withMessage("Le titre doit être une chaîne de caractères."),
  body("description")
    .isString()
    .withMessage("La description doit être une chaîne de caractères."),
  body("imageLink")
    .optional()
    .isURL()
    .withMessage("Le lien de l'image doit être une URL valide."),
  body("done").isBoolean().withMessage("Le statut doit être un booléen."),
];

export const updateTodo = [
  param("id").isMongoId().withMessage("Identifiant invalide."),
  body("title")
    .optional()
    .isString()
    .withMessage("Le titre doit être une chaîne de caractères."),
  body("description")
    .optional()
    .isString()
    .withMessage("La description doit être une chaîne de caractères."),
  body("imageLink")
    .optional()
    .isURL()
    .withMessage("Le lien de l'image doit être une URL valide."),
  body("done")
    .optional()
    .isBoolean()
    .withMessage("Le statut doit être un booléen."),
];

export const deleteTodo = [
  param("id").isMongoId().withMessage("Identifiant invalide."),
];
