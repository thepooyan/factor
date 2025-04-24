import c from "./customers.json";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import CustomersTable from "./CustomersTable";
import { Icustomer } from "~/utility/interface";

const FactorList = () => {

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
          <CustomersTable customers={c as Icustomer[]} />
        </Card>
      </div>
    </>
  );
};

export default FactorList;
