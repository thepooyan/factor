// password must contain at least a capital letter, a number, and one non alphanumeric character.
type passwordRules = {msg: string, test: (pass: string) => boolean}[];
const passwordRules:passwordRules  = [
  {msg: "Password must be at least 6 characters long", test: pass => pass.length > 5},
  {msg: "Password must contain at least one capital letter", test: pass => /[A-Z]/.test(pass)},
  {msg: "Password must contain at least one number", test: pass => /\d/.test(pass)},
  {msg: "Password must contain at least one non alphamumeric character", test: pass => /[^a-zA-Z\d\s:]/.test(pass)},
];

export const validatePassword = (pass:string):string[] => {
  return passwordRules.filter(r => !r.test(pass)).map(i => i.msg);
}

export const validateEmail = (email:string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
