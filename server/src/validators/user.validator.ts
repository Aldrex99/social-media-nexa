import { body } from "express-validator";

export const updateUser = [
  body("email")
    .optional()
    .isEmail()
    .normalizeEmail({
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      outlookdotcom_remove_subaddress: false,
      yahoo_remove_subaddress: false,
      icloud_remove_subaddress: false,
    })
    .withMessage("Adresse email invalide."),
  body("username")
    .optional()
    .isString()
    .withMessage("Le nom d'utilisateur doit être une chaîne de caractères."),
];
