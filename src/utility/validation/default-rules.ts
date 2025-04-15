import config from "./lite-config.js"

type validatorFunction = (value: string, $?: string) => boolean;
type ValidationRules = {
  [key: string]: {
    validator: validatorFunction,
    errorMessage: string,
    negateErrorMessage?: string,
    priority: number
  }
};

const Rules: ValidationRules = {
  "required": {
    validator: (value) => value.trim() !== "",
    errorMessage: "This field cannot be left empty. Please provide a value",
    negateErrorMessage: "This field is not required. Please leave it empty if unnecessary",
    priority: 1,
  },
  "email": {
    validator: (value) => config.EMAIL_REGEX.test(value),
    errorMessage: "Please provide a valid email address",
    negateErrorMessage: "This field is not supposed to be an email address",
    priority: 2,
  },
  "pattern": {
    validator: (value, $) => $ ? new RegExp($).test(value) : false,
    errorMessage: "The value does not match the required format",
    negateErrorMessage: "This field does not need to follow the provided format",
    priority: 2,
  },
  "number": {
    validator: (value) => /^[0-9]+$/.test(value),
    errorMessage: "Only numeric values are allowed in this field",
    negateErrorMessage: "Non-numeric values are allowed in this field",
    priority: 3,
  },
  "decimal": {
    validator: (value) => /^[0-9]+(.[0-9]+)?$/.test(value),
    errorMessage: "Only numeric values (with up to one decimal point) are allowed in this field",
    negateErrorMessage: "Decimal values are not allowed in this field",
    priority: 3,
  },
  "letter": {
    validator: (value) => /^[a-zA-Z]+$/.test(value),
    errorMessage: "Only alphabetic characters (A-Z, a-z) are allowed in this field",
    negateErrorMessage: "Non-alphabetic characters are allowed in this field",
    priority: 3,
  },
  "alphanumeric": {
    validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
    errorMessage: "This field must contain only letters and numbers",
    negateErrorMessage: "Special or non-alphanumeric characters are allowed in this field",
    priority: 3,
  },
  "phoneNumber": {
    validator: (value) => config.PHONE_NUMBER_REGEX.test(value),
    errorMessage: "This field must be a valid phone number",
    negateErrorMessage: "This field does not need to be a phone number",
    priority: 3,
  },
  "passwordStrength": {
    validator: (value) => {
      const lengthCheck = value.length >= config.PASSWORD_MIN_LENGTH;
      const specialCharCheck = config.PASSWORD_SPECIAL_CHAR.test(value);
      return lengthCheck && specialCharCheck;
    },
    errorMessage: `This password must be at least ${config.PASSWORD_MIN_LENGTH} characters long and contain at least one special character.`,
    negateErrorMessage: `This field does not require a strong password`,
    priority: 3,
  },
  "length": {
    validator: (value, $) => $ ? value.length === parseInt($) : false,
    errorMessage: "This field must be exactly $ characters long",
    negateErrorMessage: "This field does not need to have exactly $ characters",
    priority: 4,
  },
  "minLength": {
    validator: (value, $) => $ ? value.length >= parseInt($) : false,
    errorMessage: "This field must be at least $ characters long",
    negateErrorMessage: "This field can have fewer than $ characters",
    priority: 4,
  },
  "maxLength": {
    validator: (value, $) => $ ? value.length <= parseInt($) : false,
    errorMessage: "This field must not exceed $ characters in length",
    negateErrorMessage: "This field can have more than $ characters",
    priority: 4,
  },
  "minRange": {
    validator: (value, $) => $ ? parseFloat(value) >= parseFloat($) : false,
    errorMessage: "This field must be at least $",
    negateErrorMessage: "This field does not require a minimum value of $",
    priority: 4,
  },
  "maxRange": {
    validator: (value, $) => $ ? parseFloat(value) <= parseFloat($) : false,
    errorMessage: "This field must not exceed $",
    negateErrorMessage: "This field does not require a maximum value of $",
    priority: 4,
  },
  "url": {
    validator: (value) => {
      try {
        new URL(value);
        return true;
      } catch (e) {
        return false;
      }
    },
    errorMessage: "This field must be a valid URL",
    negateErrorMessage: "This field does not need to be a URL",
    priority: 4,
  },
  "creditCardExpiration": {
    validator: (value) => {
      const parts = value.split('/');
      if (parts.length !== 2) return false;

      const [month, year] = parts.map(Number);
      const today = new Date();
      const expirationDate = new Date(`20${year}-${month}-01`);

      return expirationDate > today;
    },
    errorMessage: "This credit card has expired",
    negateErrorMessage: "This credit card does not need to be checked for expiration",
    priority: 4,
  },
  "date": {
    validator: (value) => !isNaN(Date.parse(value)),
    errorMessage: "This field must be a valid date",
    negateErrorMessage: "This field does not need to be a date",
    priority: 4,
  },
  "creditCard": {
    validator: (value) => {
      const cleanedValue = value.replace(/[\s-]/g, '');
      let sum = 0;
      let shouldDouble = false;

      for (let i = cleanedValue.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanedValue[i], 10);

        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
      }

      return sum % 10 === 0;
    },
    errorMessage: "This field must be a valid credit card number",
    negateErrorMessage: "This field does not need to be a valid credit card number",
    priority: 4,
  },
  "illegal": {
    validator: (value, $) => $ ? !new RegExp(`[${$}]`).test(value) : false,
    errorMessage: "The following characters are not allowed: $",
    negateErrorMessage: "The following characters are allowed: $",
    priority: 5,
  },
};

export default Rules;
