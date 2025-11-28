import { useParams } from "@solidjs/router";
import { Accessor, JSX, JSXElement } from "solid-js";
import { getTemplateComponent } from "./templateFactory";

export const useForm = <T>(signal?: Accessor<T | undefined | null>) => {

  const submit = (
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

  const register = (name: keyof T) => {
    if (signal)
      return {
        name: name,
        value: signal()?.[name] as (string | number) || "",
      };
    else return {
        name: name
      }
  };
  return { register, submit }
};

export const useGetTemplate = ():[(p:any)=>JSX.Element, string] => {
  const p = useParams()
  return [getTemplateComponent(p.template), p.template]
}
