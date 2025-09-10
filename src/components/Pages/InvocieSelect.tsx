import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem, RadioGroupItemLabel } from "~/components/ui/radio-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { createSignal, For } from "solid-js";
import { selectedCompany } from "~/utility/signals";
import { templates } from "~/data/dummy";
import TemplateCard from "../TemplateCard";

const InvocieSelect = () => {

  const [value, setValue] = createSignal("")

  const link = () => {
    let selection = value()
    if (!selection) return ""
    let company = selectedCompany()
    if (!company) throw new Error("شرکتی انتخاب نشده")
    return `/Invoice/${value()}/New/${company.company_id}`
  }

  return (
    <>
      <div class="flex justify-center">
        <Card class="w-full max-w-2xl">
          <CardHeader class="text-right">
            <CardTitle class="text-2xl font-bold">ایجاد فاکتور جدید</CardTitle>
            <CardDescription>
              انتخاب از بین قالب های مختلف
            </CardDescription>
          </CardHeader>
          <form>
            <CardContent class="space-y-6">
              <div class="flex gap-2 justify-between">
                {templates.map(t => <TemplateCard template={t} onClick={() => setValue(t.nameEn)} isSelected={value() === t.nameEn}/>)}
              </div>
              <RadioGroup defaultValue="فاکتور">
                <For each={["فاکتور", "پیش فاکتور"]}>
                  {(fruit) => (
                    <RadioGroupItem value={fruit} class="cursor-pointer">
                      <RadioGroupItemLabel>{fruit}</RadioGroupItemLabel>
                    </RadioGroupItem>
                  )}
                </For>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button as="A" href={link() ? link() : null} target="_blank" class={`w-full ${link() === '' && "opacity-40"}`}>
                فاکتور جدید  
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default InvocieSelect;
