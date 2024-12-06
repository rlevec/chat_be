import { handleThrowNewErrorAction } from "../utils/index.js";

const passwordFieldValueValidator =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
const emailFieldValueValidator =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameFieldValueValidator = /^[a-zA-Z0-9_]{3,15}$/;
const termsFieldValueValidator = true;

const passwordFieldValueValidationMessage =
  "Password must be at least 8 characters long and contain at least one letter and one number.";
const emailFieldValueValidationMessage = "Please enter a valid email address";
const usernameFieldValueValidationMessage =
  "Username must be between 3 and 15 characters and can only contain letters, numbers, and underscores.";
const termsFieldValueValidationMessage =
  "You must agree to the terms of service and privacy policy";

const passwordFieldValueType = "string";
const emailFieldValueType = "string";
const usernameFieldValueType = "string";
const termsFieldValueType = "boolean";

const passwordFieldValueTypeMessage = "Password must be of string type";
const emailFieldValueTypeMessage = "Email must be of string type";
const usernameFieldValueTypeMessage = "Username must be of string type";
const termsFieldValueTypeMessage = "Terms must be of boolean type";

// Validators for each field
const bodyFieldValueValidators = {
  username: usernameFieldValueValidator,
  email: emailFieldValueValidator,
  password: passwordFieldValueValidator,
  confirmPassword: passwordFieldValueValidator,
  terms: termsFieldValueValidator,
  newPassword: passwordFieldValueValidator,
  confirmNewPassword: passwordFieldValueValidator,
  newEmail: emailFieldValueValidator,
  newUsername: usernameFieldValueValidator,
  userUsername: usernameFieldValueValidator,
  contactUsername: usernameFieldValueValidator
};

// Error messages for validation failures
const bodyFieldValueValidatorMessages = {
  username: usernameFieldValueValidationMessage,
  email: emailFieldValueValidationMessage,
  password: passwordFieldValueValidationMessage,
  confirmPassword: passwordFieldValueValidationMessage,
  terms: termsFieldValueValidationMessage,
  newPassword: passwordFieldValueValidationMessage,
  confirmNewPassword: passwordFieldValueValidationMessage,
  newEmail: emailFieldValueValidationMessage,
  newUsername: usernameFieldValueValidationMessage,
  userUsername: usernameFieldValueValidationMessage,
  contactUsername: usernameFieldValueValidationMessage
};

const bodyFieldValueTypesMessages = {
  username: usernameFieldValueTypeMessage,
  email: emailFieldValueTypeMessage,
  password: passwordFieldValueTypeMessage,
  confirmPassword: passwordFieldValueTypeMessage,
  terms: termsFieldValueTypeMessage,
  newPassword: passwordFieldValueTypeMessage,
  confirmNewPassword: passwordFieldValueTypeMessage,
  newEmail: emailFieldValueTypeMessage,
  newUsername: usernameFieldValueTypeMessage,
  userUsername: usernameFieldValueTypeMessage,
  contactUsername: usernameFieldValueTypeMessage
};

// Expected types for each field
const bodyFieldValueTypes = {
  username: usernameFieldValueType,
  email: emailFieldValueType,
  password: passwordFieldValueType,
  confirmPassword: passwordFieldValueType,
  terms: termsFieldValueType,
  newPassword: passwordFieldValueType,
  confirmNewPassword: passwordFieldValueType,
  newEmail: emailFieldValueType,
  newUsername: usernameFieldValueType,
  userUsername: usernameFieldValueType,
  contactUsername: usernameFieldValueType
};




// Main request body validator function
export const handleRequestBodyValidatationAction = async (body) => {
  if (!body) {
    handleThrowNewErrorAction(400, "Request body is missing");
  }

  for (const property in body) {
    const key = property;
    const val = body[property];

    if (key in bodyFieldValueTypes) {
     

      const isValidDataType = typeof val === bodyFieldValueTypes[key];

      if (!isValidDataType) {
        const bodyFieldValueTypeMessage = bodyFieldValueTypesMessages[key];
        handleThrowNewErrorAction(400, bodyFieldValueTypeMessage);
      }
    }

    // Check if the key is in validators
    if (key in bodyFieldValueValidators) {
      // Check regex validation
      const isValidValue =
        bodyFieldValueValidators[key] instanceof RegExp
          ? bodyFieldValueValidators[key].test(val) // Use regex test
          : true; // For boolean values (like terms)

      if (!isValidValue) {
        const validationMessage = bodyFieldValueValidatorMessages[key];
        handleThrowNewErrorAction(400, validationMessage);
      }
    }

    if ("password" in body && "confirmPassword" in body) {
      if (body["password"] !== body["confirmPassword"]){
        handleThrowNewErrorAction(400, "Passwords do not match");
      }
       
    }
    if ("newPassword" in body && "confirmNewPassword" in body) {
      if (body["newPassword"] !== body["confirmNewPassword"]){
        handleThrowNewErrorAction(400, "Passwords do not match");
      }
       
    }
  }


  return {
    status: 200,
    success: true,
    message: "Body is valid!",
  };
};

export const handleRequestQueryValidationAction = async (query) => {
  if (!query) {
    handleThrowNewErrorAction(400, "Request query is missing");
  } else {
    const queryValues = Object.values(query);

    if (queryValues?.length) {
      queryValues?.forEach((value) => {
        if (typeof value !== "string") {
          handleThrowNewErrorAction(
            400,
            "Request body parameter not of string type"
          );
        } else if (value === "") {
          handleThrowNewErrorAction(
            400,
            "Request body parameter is empty string"
          );
        }
      });
    }

    return {
      success: true,
      status: 200,
      message: "Request query is valid",
    };
  }
};
