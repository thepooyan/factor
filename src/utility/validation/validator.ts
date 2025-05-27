import rules from "./default-rules";
import config from "./lite-config"

type supportedTypes = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type events = "blur" | "keyup" | "keydown"
export function setValidationEvents(section?: Element, event?: events) {
  let target = section ? section : document;
  let items = target.querySelectorAll(
    selectTargetElements(),
  ) as NodeListOf<supportedTypes>;
  items.forEach((i) => {
    setValidationEvent(i, event);
  });
}

export function validateSection(section: Element) {
  let pass = true;
  let targets = (section.querySelectorAll(selectTargetElements()) as NodeListOf<supportedTypes>)
  for (let target of targets) {
    let result = validateItem(target)
    if (result === false)
      pass = false
  }
  return pass
}

function selectTargetElements() {
  let selection = ``;
  for (let s of config.SUPPORTED_ELEMENTS) {
    selection += `${s}[data-${config.TRIGGER_KEYWORD}],`;
  }
  return selection.substring(0, selection.length - 1);
}

function setValidationEvent(item: supportedTypes, event: events = "blur") {
  //make sure event is never set twice 
  item.addEventListener(event , () => {
    validateItem(item);
  });
}

type errorDescription = {msg: string, proirity: number}
function validateItem(item: supportedTypes): boolean {
  let success = true;
  let errors: errorDescription[] = [];
  let validations = findValidations(item);
  if (validations.length == 0) return true;
  for (const v of validations) {
    let valiResult = executeValidation(v, item)
    if (valiResult[0] !== "") {
      success = false;
      errors.push({msg: valiResult[0], proirity: valiResult[1]})
    };
  }
  reflectValidation(item, errors);
  return success;
}

function executeValidation(validationTag: string, element: supportedTypes): [string, number] {
  if (validationTag === "") return ["", 0]
  let negate = false;

  let base = validationTag;
  let arg: string | undefined;

  if (base.substring(0, 1) === "!") {
    base = base.substring(1);
    negate = true;
  }

  if (base.includes("-")) {
    let split = base.split("-");
    base = split[0];
    arg = split[1];
    if (/^\[.*\]$/.test(arg)) {
      arg = arg.substring(1, arg.length-1)
    }
    if (base === "" || arg === "") throw new Error(`Deformed validation tag: ${validationTag}`)
  }

  let rule = rules[base];
  if (rule === undefined) throw new Error(`No rule defined for "${base}".`);

  let result = rule.validator(element.value, arg);
  if (negate === true) result = !result;
  let errorMsg = rule.errorMessage;
  if (arg !== undefined) {
    errorMsg = errorMsg.replace("$", arg)
  }
  if (result === false) return [errorMsg, rule.priority]
  return ["", 0]
}

function findValidations(item: supportedTypes) {
  return (item.dataset[config.TRIGGER_KEYWORD] || "").trim().split(" ");
}

function reflectValidation(item: supportedTypes,errors: errorDescription[]) {
  const errorDisplay = findErrorElement(item);
  const errorClass = item.dataset.errorclass;
  const successClass = item.dataset.successClass;

  if (errors.length === 0) {
    if (errorDisplay)
    errorDisplay.textContent = "";
    errorClass && item.classList.remove(errorClass)
    successClass && item.classList.add(successClass)
    return
  }

  let highestPriority = errors.reduce((p, c) => p.proirity < c.proirity ? p : c).proirity;
  let targetErrors = errors.filter(i => i.proirity === highestPriority);

  targetErrors.forEach((err, ind) => {
    if (errorDisplay)
    if (ind === 0)
    errorDisplay.textContent = err.msg
    else
    errorDisplay.textContent += config.CONCATER + err.msg
  })
  errorClass && item.classList.add(errorClass)
  successClass && item.classList.remove(successClass)
}

function findErrorElement(item: supportedTypes) {
  if (item.hasAttribute("noErrorEmit")) return
  let element = item.nextElementSibling;
  if (element !== null) {
    if (element.classList.contains(config.ERROR_CLASSNAME))
      return element;
  }
  console.log(item);
  console.error(`above logged input has no validation box. please add an element with "${config.ERROR_CLASSNAME}" classname next to it!`)
}
