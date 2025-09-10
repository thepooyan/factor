import Classic from "~/components/Template/Classic"
import Minimal from "~/components/Template/Minimal"

export const getTemplateComponent = (templateName: string) => {
  switch (templateName) {
    case "Classic":
      return Classic
    case "Minimal":
      return Minimal
    default:
      throw new Error(`Template: ${templateName} not found!`)
  }
}
