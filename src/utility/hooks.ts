import { Accessor } from "solid-js";

export const useForm = (signal: Accessor<any>) => {

  const submit = <T extends Record<string, any>>(
    submitHandler: (data: T) => void,
  ) => {
    return (event: SubmitEvent) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      if (!form) {
        console.error("Event target is not an HTMLFormElement");
        return;
      }

      const formData = new FormData(form);
      const formValues: Record<string, any> = {};

      for (const [name, value] of formData.entries()) {
        formValues[name] = value;
      }

      submitHandler(formValues as T);
    };
  };

  const register = (name: string) => {
    if (signal !== undefined)
      return {
        name: name,
        value: signal()?.[name] || "",
      };
    return { name: name };
  };
  return { register, submit }
};
