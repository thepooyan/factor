import c from "./customers.json";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import CustomersTable from "./CustomersTable";
import { Icustomer } from "~/utility/interface";
import { onMount } from "solid-js";
import { api } from "~/utility/api";
import { selectedCompany } from "~/utility/signals";

const FactorList = () => {

  onMount(async () => {
    let id = selectedCompany()?.company_id
    if (!id) return
    let a = await api.post("/factor/CompanyAllFactors", {company_id: id})
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
        </Card>
      </div>
    </>
  );
};

export default FactorList;
