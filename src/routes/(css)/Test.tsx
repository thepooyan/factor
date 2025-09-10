import { Card, CardContent } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Plus, FileText, Building, Palette } from "lucide-solid"
import { createSignal } from "solid-js"
import { templates } from "~/data/dummy"
import TemplateCard from "~/components/TemplateCard"


export default function TemplateSelector() {
  const [selectedTemplate, setSelectedTemplate] = createSignal<string | null>(null)

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    // Here you would typically navigate to the invoice creation page with the selected template
    console.log("Selected template:", templateId)
  }

  return (
    <div class="container mx-auto px-4 py-8" dir="rtl">
      {/* Templates Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {templates.map((template) => <TemplateCard template={template}/> )}
      </div>

      {/* Custom Template Section */}
      <div class="max-w-2xl mx-auto">
        <Card class="border-2 border-dashed border-muted-foreground/30 hover:border-accent/50 transition-colors">
          <CardContent class="p-8 text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
              <Plus class="w-8 h-8 text-accent" />
            </div>
            <h3 class="text-2xl font-bold text-card-foreground mb-3">قالب سفارشی</h3>
            <p class="text-muted-foreground mb-6 text-pretty">
              نیاز به قالب خاص دارید؟ ما برای شما قالب اختصاصی طراحی می‌کنیم
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" class="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Palette class="w-5 h-5 ml-2" />
                سفارش قالب سفارشی
              </Button>
              <Button size="lg" variant="outline">
                <Building class="w-5 h-5 ml-2" />
                مشاوره رایگان
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

