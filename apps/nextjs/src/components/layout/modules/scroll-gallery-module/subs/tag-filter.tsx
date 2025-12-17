import { CheckIcon } from '@phosphor-icons/react/dist/ssr';
import { Checkbox } from 'react-aria-components';
import { tv } from 'tailwind-variants';

interface ITagFilterProps {
  isSelected: boolean;
  isIndeterminate: boolean;
  label: string;
  onChange: (isSelected: boolean) => void;
}

export function TagFilter({ isSelected, label, onChange, isIndeterminate }: ITagFilterProps) {
  const { labelTv, checkboxTv, containerTv, checkIconTv } = stylesTv({ isSelected, isIndeterminate });

  return (
    <Checkbox isSelected={isSelected} isIndeterminate={isIndeterminate} onChange={onChange} className={containerTv()}>
      <div className={checkboxTv()}>
        <CheckIcon className={checkIconTv()} />
      </div>
      <span className={labelTv()}>{label}</span>
    </Checkbox>
  );
}

const stylesTv = tv({
  slots: {
    containerTv: 'flex items-center gap-2 cursor-pointer',
    labelTv: 'text-sm text-primary-text',
    checkboxTv: 'size-5 border bg-bg border-bg rounded-sm flex items-center justify-center',
    checkIconTv: 'hidden'
  },
  variants: {
    isSelected: {
      true: {
        checkIconTv: 'block size-5 text-primary'
      },
      false: {}
    },
    isIndeterminate: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      isSelected: false,
      isIndeterminate: true,
      className: {
        checkboxTv: 'after:size-4 after:bg-primary after:rounded-sm'
      }
    }
  ]
});
