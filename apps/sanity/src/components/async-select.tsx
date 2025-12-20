import { useEffect, useState } from 'react';
import { type ArrayOfObjectsInputProps, useClient } from 'sanity';
import { DOCUMENT_SCHEMA_TYPES } from '../common/constants';

export const AsyncSelect = (props: ArrayOfObjectsInputProps) => {
  const client = useClient({ apiVersion: '2023-10-01' });

  const [tags, setTags] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "${DOCUMENT_SCHEMA_TYPES.mediaTagAsset}"]`).then(setTags);
  }, [client.fetch]);

  const newProps = Object.assign({}, props);

  if (newProps.schemaType.options) {
    newProps.schemaType.options.list = tags.map(t => t);
  }

  return props.renderDefault(newProps);
};
