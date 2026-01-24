import { MODULE_VARIANTS, type TModuleVariants } from '@forma/common';
import { isNil, isNotNil } from 'es-toolkit';
import { type ComponentProps, useMemo } from 'react';
import type { CtaObjectType } from 'types/generated/sanity-types-generated';
import { LinkButton } from '@/ui/buttons/link-button/link-button';

type TProps = {
  variant: TModuleVariants;
  primaryCta?: CtaObjectType;
  secondaryCta?: CtaObjectType;
};

export async function Actions({ primaryCta, secondaryCta, variant }: TProps) {
  const buttonsSurface = useMemo<ComponentProps<typeof LinkButton>['surface']>(() => {
    return variant === MODULE_VARIANTS.ON_BG ? 'bg' : 'primary';
  }, [variant]);

  if (isNil(primaryCta) && isNil(secondaryCta)) {
    return null;
  }

  return (
    <div className='mt-10 lg:mx-[unset] flex flex-col lg:flex-row gap-2 lg:gap-8'>
      {isNotNil(primaryCta) && primaryCta.showCta && (
        <LinkButton href={primaryCta.url} size='large' variant='primary' surface={buttonsSurface}>
          {primaryCta.caption}
        </LinkButton>
      )}
      {isNotNil(secondaryCta) && secondaryCta.showCta && (
        <LinkButton href={secondaryCta.url} size='large' variant='ghost' surface={buttonsSurface}>
          {secondaryCta.caption}
        </LinkButton>
      )}
    </div>
  );
}
