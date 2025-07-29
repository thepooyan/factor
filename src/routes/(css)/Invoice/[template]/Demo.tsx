import { useParams } from "@solidjs/router";
import ViewFactor from "~/components/ViewFactor";
import { sampleData } from "~/data/sample";

const Demo = () => {
  const params = useParams();

  return (
    <div>
      <ViewFactor invoiceData={sampleData} />
    </div>
  );
};

export default Demo;
