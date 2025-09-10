import { useParams } from "@solidjs/router";
import ViewFactor from "~/components/ViewFactor";
import { sampleData } from "~/data/sample";
import { getTemplateComponent } from "~/utility/templateFactory";

const Demo = () => {
  const params = useParams();
  let Component = getTemplateComponent(params.template)

  return (
    <div class="bg-gray-200 py-10">
      <ViewFactor Template={Component} data={sampleData}/>
    </div>
  );
};

export default Demo;
