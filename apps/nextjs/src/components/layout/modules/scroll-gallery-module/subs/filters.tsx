import { useMemo } from 'react';
import { tv } from 'tailwind-variants';
import type { MediaTagAssetDocumentType } from 'types/generated/sanity-types-generated';
import { TagFilter } from './tag-filter';

interface IFiltersProps {
  areSelected: Record<string, boolean>;
  onChange: (newAreSelected: Record<string, boolean>) => void;
  filters: MediaTagAssetDocumentType[];
}

export function Filters({ filters, areSelected, onChange }: IFiltersProps) {
  const { containerTv } = stylesTv();

  const isAllSelected = useMemo<boolean>(() => Object.values(areSelected).every(Boolean), [areSelected]);
  const isAllIndeterminate = useMemo<boolean>(() => Object.values(areSelected).some(Boolean), [areSelected]);

  const handleFilterChange = (tag: MediaTagAssetDocumentType, isSelected: boolean) => {
    onChange({
      ...areSelected,
      [tag._id]: isSelected
    });
  };

  const handleAllChange = () => {
    if (isAllSelected) {
      onChange(
        filters.reduce((acc, curr) => {
          acc[curr._id] = false;
          return acc;
        }, {})
      );
    } else {
      onChange(
        filters.reduce((acc, curr) => {
          acc[curr._id] = true;
          return acc;
        }, {})
      );
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

      {filters
        .filter(tag => !tag.isHidden)
        .map(tag => (
          <TagFilter
            key={tag._id}
            isSelected={areSelected[tag._id]}
            isIndeterminate={false}
            label={tag.displayName}
            onChange={isSelected => handleFilterChange(tag, isSelected)}
          />
        ))}
    </div>
  );
}

const stylesTv = tv({
  slots: {
    containerTv: 'min-h-12 flex-wrap bg-primary size-full z-10 flex items-center gap-x-10 gap-y-2 justify-center py-2'
  }
});
