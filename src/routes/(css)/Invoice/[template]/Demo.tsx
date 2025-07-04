import { useParams } from "@solidjs/router";

const Demo = () => {
  const params = useParams();

  return (
    <div>
      Demo of {params.template}
    </div>
  )
}

export default Demo
