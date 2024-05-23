import { TemplateSchemaType } from "../../../common/types";

export async function dbDeleteTemplate(
  mongoose: any,
  userParmId: string,
  templateId: string
): Promise<TemplateSchemaType> {
  const Template = mongoose.model("Template");

  try {
    // delete template
    const deletedTemplate = await Template.findOneAndDelete({
      userParmId,
      id: templateId,
    });

    // return
    return deletedTemplate;
  } catch (error) {
    throw error;
  }
}
