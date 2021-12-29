export type Classification = 'fct' | 'cdc' | 'cmd' | 'sys';

export const generateTopicName = (
  domain: string,
  classification: Classification,
  description: string,
  version = 0,
  dataCenter = 'local'
) => {
  return `${dataCenter}.${domain}.${classification}.${description}.${version}`;
};
