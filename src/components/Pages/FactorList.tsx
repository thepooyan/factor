import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { createEffect, createSignal, onMount } from "solid-js";
import { AI_Factor } from "~/utility/apiInterface";
import FactorsTable from "./FactorsTable";
import { queryFactorList } from "~/utility/queries";

const FactorList = () => {

  const [factors, setFactors] = createSignal<AI_Factor[]>([]);

  let query: any
  onMount(() => {
   query = queryFactorList()
  })

  createEffect(() => {
    if (query.data)
      setFactors(query.data.data)
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
