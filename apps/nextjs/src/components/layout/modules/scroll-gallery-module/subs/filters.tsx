import { IMAGE_TAG, type TImageTag } from '@forma/common';
import { useMemo } from 'react';
import { tv } from 'tailwind-variants';
import { TagFilter } from './tag-filter';
import { getFilterTagLabel } from './utils';

interface IFiltersProps {
  areSelected: Record<TImageTag, boolean>;
  onChange: (newAreSelected: Record<TImageTag, boolean>) => void;
}

export function Filters({ areSelected, onChange }: IFiltersProps) {
  const { containerTv } = stylesTv();

  const isAllSelected = useMemo<boolean>(() => Object.values(areSelected).every(Boolean), [areSelected]);
  const isAllIndeterminate = useMemo<boolean>(() => Object.values(areSelected).some(Boolean), [areSelected]);

  const handleFilterChange = (tag: TImageTag, isSelected: boolean) => {
    onChange({
      ...areSelected,
      [tag]: isSelected
    });
  };

  const handleAllChange = () => {
    if (isAllSelected) {
      onChange({
        [IMAGE_TAG.ARCHITECTURAL_STILLS]: false,
        [IMAGE_TAG.VIDEO_ANIMATIONS]: false,
        [IMAGE_TAG.VR_360]: false
      });
    } else {
      onChange({
        [IMAGE_TAG.ARCHITECTURAL_STILLS]: true,
        [IMAGE_TAG.VIDEO_ANIMATIONS]: true,
        [IMAGE_TAG.VR_360]: true
      });
    }
  };

  return (
    <div className={containerTv()}>
      <TagFilter
        isSelected={isAllSelected}
        isIndeterminate={isAllIndeterminate}
        label='All'
        onChange={handleAllChange}
      />

      {Object.values(IMAGE_TAG).map(tag => (
        <TagFilter
          key={tag}
          isSelected={areSelected[tag]}
          isIndeterminate={false}
          label={getFilterTagLabel(tag)}
          onChange={isSelected => handleFilterChange(tag, isSelected)}
        />
      ))}
    </div>
  );
}

const stylesTv = tv({
  slots: {
    containerTv: 'min-h-24 flex-wrap bg-primary size-full z-10 flex items-center gap-x-10 gap-y-2 justify-center py-2'
  }
});
