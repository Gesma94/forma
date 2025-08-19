import { PaletteIcon } from "lucide-react";
import { ArrayRule, BlockDecoratorProps, defineArrayMember, defineField, ValidationBuilder } from "sanity";

type TProps = {
  name: string;
  title: string;
  validation?: ValidationBuilder<ArrayRule<unknown[]>, unknown[]>;
}

export function defineRichEditorField({ name, title, validation }: TProps): ReturnType<typeof defineField> {
    return defineField({
          name,
          title,
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              marks: {
                decorators: [
                  { title: 'Bold', value: 'strong' },
                  { title: 'Italic', value: 'em' },
                  { title: 'Color', value: 'color', icon: ColorIcon, component: ColorDecorator }
                ],
                annotations: [
                
                ]
              },
              lists: [],
              styles: []
            })
          ],
          validation
        })
}

function ColorDecorator(props: BlockDecoratorProps) {
  return (
    <span style={{ background: '#faf4df', color: '#e3562d' }}>{props.children}</span>
  );
}

function ColorIcon() {
  return (
    <div style={{ marginRight: '2px'}}><PaletteIcon style={{ width: '14px', height: '14px'}} /></div>
  );
}