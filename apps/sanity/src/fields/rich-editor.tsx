import { PaletteIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import {
  type ArrayRule,
  type BlockDecoratorDefinition,
  type BlockDecoratorProps,
  type BlockListDefinition,
  type BlockStyleDefinition,
  defineArrayMember,
  defineField,
  type ValidationBuilder
} from 'sanity';

type TProps = {
  name: string;
  title: string;
  note?: string;
  fieldset?: string;
  allowColorMarkDecorator?: boolean;
  allowH1?: boolean;
  allowH2?: boolean;
  allowBulletPoint?: boolean;
  validation?: ValidationBuilder<ArrayRule<unknown[]>, unknown[]>;
};

export function defineRichEditorField({
  name,
  title,
  note,
  fieldset,
  allowColorMarkDecorator = true,
  allowH1 = false,
  allowH2 = false,
  allowBulletPoint = false,
  validation
}: TProps): ReturnType<typeof defineField> {
  return defineField({
    name,
    title,
    type: 'array',
    fieldset,
    description: note ? <Note>{note}</Note> : undefined,
    of: [
      defineArrayMember({
        type: 'block',
        marks: {
          decorators: getMarkDecorators(allowColorMarkDecorator),
          annotations: []
        },
        lists: getListDecorators(allowBulletPoint),
        styles: getStyleDecorators(allowH1, allowH2)
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

function getStyleDecorators(allowH1Mark: boolean, allowH2Mark: boolean): BlockStyleDefinition[] {
  const styleDecorators: BlockStyleDefinition[] = [];

  if (allowH1Mark || allowH2Mark) {
    styleDecorators.push({
      title: 'Normal',
      value: 'normal'
    });
  }
  if (allowH1Mark) {
    styleDecorators.push({
      title: 'Title',
      value: 'h1'
    });
  }
  if (allowH2Mark) {
    styleDecorators.push({
      title: 'Subtitle',
      value: 'h3'
    });
  }

  return styleDecorators;
}

function getListDecorators(allowBulletMark: boolean): BlockListDefinition[] {
  const styleDecorators: BlockListDefinition[] = [];

  if (allowBulletMark) {
    styleDecorators.push({
      title: 'Bullet',
      value: 'bullet'
    });
  }

  return styleDecorators;
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
