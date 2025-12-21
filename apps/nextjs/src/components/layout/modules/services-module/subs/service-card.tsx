import { getFormaMediaData } from 'common/utils/get-forma-media';
import type { ServiceObjectType } from 'types/generated/sanity-types-generated';
import { ServiceCardClient } from './service-card-client';

type TProps = {
  service: ServiceObjectType;
};

export async function ServiceCard({ service }: TProps) {
  const formaMediaData = await getFormaMediaData(service.formaMedia);
  return <ServiceCardClient formaMediaData={formaMediaData} service={service} />;
}
