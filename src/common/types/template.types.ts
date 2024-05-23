export type TemplateBaseType = {
  id: string;
  name: string;
  bodies: string[];
  index: number;
};

export type TemplateSchemaType = TemplateBaseType & {
  userParmId: string;
  created: Date;
};
