import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { createEffect, createSignal, lazy, onMount, Show } from "solid-js";
import { AI_Factor } from "~/utility/apiInterface";
import FactorsTable from "./FactorsTable";
import { queryFactorList } from "~/utility/queries";
import Spinner from "../general/Spinner";
import { UseQueryResult } from "@tanstack/solid-query";
import { AxiosResponse } from "axios";
const Heavy = lazy(() => import("~/components/ViewFactor"))

const FactorList = () => {

  const [factors, setFactors] = createSignal<AI_Factor[]>([]);
  const [pending, setPending] = createSignal(false)

  let query: UseQueryResult<AxiosResponse<AI_Factor[]>>
  onMount(() => {
    query = queryFactorList()
    Heavy.preload()
  })

  createEffect(() => {
    if (query !== undefined) {
      setFactors(query?.data?.data || [])
      setPending(query.isPending)
    }
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
          <Show when={pending()}><Spinner/></Show>
        </Card>
      </div>
    </>
  );
};

export default FactorList;
