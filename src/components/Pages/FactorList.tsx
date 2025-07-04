import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { createSignal, onMount } from "solid-js";
import { api } from "~/utility/api";
import { selectedCompany } from "~/utility/signals";
import { AI_Factor } from "~/utility/apiInterface";
import FactorsTable from "./FactorsTable";

const FactorList = () => {

  const [factors, setFactors] = createSignal<AI_Factor[]>([]);

  onMount(async () => {
    let id = selectedCompany()?.company_id
    if (!id) return
    let a = await api.post<AI_Factor[]>("/factor/CompanyAllFactors", {company_id: id})
    setFactors(a.data)
  })

  return (
    <>
      <div class="flex justify-center">
        <Card class="w-full">
          <CardHeader class="text-right">
            <CardTitle class="text-2xl font-bold">
               لیست فاکتور
            </CardTitle>
            <CardDescription>
              سابقه فاکتور های صادر شده شما 
            </CardDescription>
          </CardHeader>
          <FactorsTable factors={factors}/>
        </Card>
      </div>
    </>
  );
};

export default FactorList;
