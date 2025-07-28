import config from "./lite-config.js";

type validatorFunction = (value: string, $?: string) => boolean;
type ValidationRules = {
  [key: string]: {
    validator: validatorFunction;
    errorMessage: string;
    negateErrorMessage?: string;
    priority: number;
  };
};

const Rules: ValidationRules = {
  "required": {
    validator: (value) => value.trim() !== "",
    errorMessage: "این بخش نمیتواند خالی باشد، لطفا یک مقدار وارد کنید",
    negateErrorMessage: "این فیلد ضروری نیست. اگر لازم نیست، لطفا آن را خالی بگذارید",
    priority: 1,
  },
  "email": {
    validator: (value) => config.EMAIL_REGEX.test(value),
    errorMessage: "لطفا یک آدرس ایمیل معتبر وارد کنید",
    negateErrorMessage: "این فیلد نباید یک آدرس ایمیل باشد",
    priority: 2,
  },
  "pattern": {
    validator: (value, $) => $ ? new RegExp($).test(value) : false,
    errorMessage: "مقدار وارد شده با فرمت مورد نیاز مطابقت ندارد",
    negateErrorMessage: "این فیلد نیازی به پیروی از فرمت ارائه شده ندارد",
    priority: 2,
  },
  "number": {
    validator: (value) => /^[0-9]+$/.test(value),
    errorMessage: "فقط مقادیر عددی در این فیلد مجاز هستند",
    negateErrorMessage: "مقادیر غیر عددی در این فیلد مجاز هستند",
    priority: 3,
  },
  "decimal": {
    validator: (value) => /^[0-9]+(.[0-9]+)?$/.test(value),
    errorMessage: "فقط مقادیر عددی (با حداکثر یک نقطه اعشار) در این فیلد مجاز هستند",
    negateErrorMessage: "مقادیر اعشاری در این فیلد مجاز نیستند",
    priority: 3,
  },
  "letter": {
    validator: (value) => /^[a-zA-Z]+$/.test(value),
    errorMessage: "فقط حروف الفبا (A-Z, a-z) در این فیلد مجاز هستند",
    negateErrorMessage: "کاراکترهای غیر الفبایی در این فیلد مجاز هستند",
    priority: 3,
  },
  "alphanumeric": {
    validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
    errorMessage: "این فیلد فقط میتواند شامل حروف و اعداد باشد",
    negateErrorMessage: "کاراکترهای خاص یا غیر الفبایی در این فیلد مجاز هستند",
    priority: 3,
  },
  "phoneNumber": {
    validator: (value) => config.PHONE_NUMBER_REGEX.test(value),
    errorMessage: "این فیلد باید یک شماره تلفن معتبر باشد",
    negateErrorMessage: "این فیلد نیازی به شماره تلفن بودن ندارد",
    priority: 3,
  },
  "specialChar": {
    validator: (value) => config.PASSWORD_SPECIAL_CHAR.test(value),
    errorMessage: "این ورودی باید شامل حداقل یکی از حروف خاص (!@#$%^.?) باشد",
    negateErrorMessage: "این فیلد نیازی به شماره تلفن بودن ندارد",
    priority: 3,
  },
  "containCapital": {
    validator: (value) => /[A-Z]/.test(value),
    errorMessage: "این مقدار باید شامل حروف انگلیسی بزرگ باشد",
    negateErrorMessage: "این فیلد نیازی به شماره تلفن بودن ندارد",
    priority: 3,
  },
  "containNonCapital": {
    validator: (value) => /[a-z]/.test(value),
    errorMessage: "این مقدار باید شامل حروف انگلیسی کوچک باشد",
    negateErrorMessage: "این فیلد نیازی به شماره تلفن بودن ندارد",
    priority: 3,
  },
  "passwordStrength": {
    validator: (value) => {
      const lengthCheck = value.length >= config.PASSWORD_MIN_LENGTH;
      const specialCharCheck = config.PASSWORD_SPECIAL_CHAR.test(value);
      return lengthCheck && specialCharCheck;
    },
    errorMessage: `این رمز عبور باید حداقل ${config.PASSWORD_MIN_LENGTH} کاراکتر باشد و حداقل شامل یک کاراکتر خاص باشد.`,
    negateErrorMessage: `این فیلد نیازی به رمز عبور قوی ندارد`,
    priority: 3,
  },
  "length": {
    validator: (value, $) => $ ? value.length === parseInt($) : false,
    errorMessage: "این فیلد باید دقیقا $ کاراکتر باشد",
    negateErrorMessage: "این فیلد نیازی به داشتن دقیقا $ کاراکتر ندارد",
    priority: 4,
  },
  "minLength": {
    validator: (value, $) => $ ? value.length >= parseInt($) : false,
    errorMessage: "این فیلد باید حداقل $ کاراکتر باشد",
    negateErrorMessage: "این فیلد می تواند کمتر از $ کاراکتر داشته باشد",
    priority: 4,
  },
  "maxLength": {
    validator: (value, $) => $ ? value.length <= parseInt($) : false,
    errorMessage: "طول این فیلد نباید از $ کاراکتر بیشتر شود",
    negateErrorMessage: "این فیلد می تواند بیشتر از $ کاراکتر داشته باشد",
    priority: 4,
  },
  "minRange": {
    validator: (value, $) => $ ? parseFloat(value) >= parseFloat($) : false,
    errorMessage: "این فیلد باید حداقل $ باشد",
    negateErrorMessage: "این فیلد نیازی به حداقل مقدار $ ندارد",
    priority: 4,
  },
  "maxRange": {
    validator: (value, $) => $ ? parseFloat(value) <= parseFloat($) : false,
    errorMessage: "این فیلد نباید بیشتر از $ باشد",
    negateErrorMessage: "این فیلد نیازی به حداکثر مقدار $ ندارد",
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
    errorMessage: "این فیلد باید یک آدرس اینترنتی معتبر باشد",
    negateErrorMessage: "این فیلد نیازی به آدرس اینترنتی بودن ندارد",
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
    errorMessage: "تاریخ انقضای این کارت اعتباری گذشته است",
    negateErrorMessage: "تاریخ انقضای این کارت اعتباری نیازی به بررسی ندارد",
    priority: 4,
  },
  "date": {
    validator: (value) => !isNaN(Date.parse(value)),
    errorMessage: "این فیلد باید یک تاریخ معتبر باشد",
    negateErrorMessage: "این فیلد نیازی به تاریخ بودن ندارد",
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
    errorMessage: "این فیلد باید یک شماره کارت اعتباری معتبر باشد",
    negateErrorMessage: "این فیلد نیازی به شماره کارت اعتباری معتبر بودن ندارد",
    priority: 4,
  },
  "illegal": {
    validator: (value, $) => $ ? !new RegExp(`[${$}]`).test(value) : false,
    errorMessage: "کاراکترهای زیر مجاز نیستند: $",
    negateErrorMessage: "کاراکترهای زیر مجاز هستند: $",
    priority: 5,
  },
  "neq": {
    validator: (value, $) => $ ? value !== $ : false,
    errorMessage: "مقدار نمیتواند $ باشد",
    negateErrorMessage: "کاراکترهای زیر مجاز هستند: $",
    priority: 5,
  },
};

export default Rules;
