import { Template } from "~/utility/interface";
import { Card, CardContent } from "./ui/card";
import { Badge, Eye, FileText } from "lucide-solid";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

interface p {
  template: Template;
  onClick?: () => any;
  isSelected: boolean
}
const TemplateCard = (props:p) => {
  return (
    <Card
      class={cn("group hover:shadow-lg transition-color duration-300 cursor-pointer border-2 hover:border-accent/50 w-75",
        props.isSelected && "  !border-black"
      )}
      onClick={props.onClick}
    >
      <CardContent class="p-0">
        {/* Template Preview Image */}
        <div class="relative overflow-hidden rounded-t-lg">
          <img
            src={`/templates/${props.template.nameEn}.png`}
            alt={props.template.name}
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {props.template.isPopular && (
            <Badge class="absolute top-3 right-3 bg-accent text-accent-foreground">
              محبوب
            </Badge>
          )}
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Template Info */}
        <div class="p-6">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xl font-bold text-card-foreground  transition-colors">
              {props.template.name}
            </h3>
          </div>
          <p class="text-muted-foreground text-sm mb-4 text-pretty">
            {props.template.description}
          </p>
          <div class="flex flex-col gap-2">
            <Button
              onClick={props.onClick}
            >
              <FileText class="w-4 h-4 ml-2" />
              انتخاب قالب
            </Button>
            <Button
              onClick={props.onClick}
              variant="secondary"
              as="A"
              target="_blank"
              href={`/Invoice/${props.template.nameEn}/Demo`}
            >
              <Eye class="w-4 h-4 ml-2" />
              مشاهده نمونه
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
