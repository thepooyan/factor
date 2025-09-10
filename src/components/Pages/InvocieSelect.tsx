import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem, RadioGroupItemLabel } from "~/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { createSignal, For } from "solid-js";
import { Invoice_template_labels } from "~/utility/settings";
import { selectedCompany } from "~/utility/signals";
import { templates } from "~/data/dummy";
import TemplateCard from "../TemplateCard";

const InvocieSelect = () => {

  const [value, setValue] = createSignal("")

  const link = () => {
    let selection = value()
    let company = selectedCompany()
    if (!selection || !company) return ""
    let template = Invoice_template_labels.get(selection)
    if (!template) throw new Error("قالب انتخاب شده تعریف نشده")
    return `/Invoice/${template}/New/${company.company_id}`
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
                {templates.map(t => <TemplateCard template={t}/>)}
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
