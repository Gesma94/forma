import { PaletteIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import {
  type ArrayRule,
  type BlockDecoratorDefinition,
  type BlockDecoratorProps,
  defineArrayMember,
  defineField,
  type ValidationBuilder
} from 'sanity';

type TProps = {
  name: string;
  title: string;
  note?: string;
  allowColorMarkDecorator?: boolean;
  validation?: ValidationBuilder<ArrayRule<unknown[]>, unknown[]>;
};

export function defineRichEditorField({
  name,
  title,
  note,
  allowColorMarkDecorator = true,
  validation
}: TProps): ReturnType<typeof defineField> {
  return defineField({
    name,
    title,
    type: 'array',
    description: note ? <Note>{note}</Note> : undefined,
    of: [
      defineArrayMember({
        type: 'block',
        marks: {
          decorators: getMarkDecorators(allowColorMarkDecorator),
          annotations: []
        },
        lists: [],
        styles: []
      })
    ],
    validation
  });
}

function getMarkDecorators(allowColorMarkDecorator: boolean) {
  const baseDecorators: BlockDecoratorDefinition[] = [
    { title: 'Bold', value: 'strong' },
    { title: 'Italic', value: 'em' }
  ];

  if (allowColorMarkDecorator) {
    baseDecorators.push({
      title: 'Color',
      value: 'color',
      icon: ColorIcon,
      component: ColorDecorator
    });
  }

  return baseDecorators;
}

function ColorDecorator(props: BlockDecoratorProps) {
  return <span style={{ background: '#faf4df', color: '#e3562d' }}>{props.children}</span>;
}

function ColorIcon() {
  return (
    <div style={{ marginRight: '2px' }}>
      <PaletteIcon style={{ width: '14px', height: '14px' }} />
    </div>
  );
}

function Note({ children }: PropsWithChildren) {
  return (
    <div style={{ fontSize: '12px', fontStyle: 'italic' }}>
      <span style={{ fontWeight: 'bold' }}>Note: </span>
      <span style={{}}>{children}</span>
    </div>
  );
}
