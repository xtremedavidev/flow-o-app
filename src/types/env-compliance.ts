export interface EnvTopicsAndTagsResp {
  topics: string[];
  tags: {
    carbon: string[];
    oil: string[];
    energy: string[];
    royalty: string[];
    well: string[];
    policy: string[];
    law: string[];
  };
}


interface ResourceList {
  cache_last_updated: string | null;
  cache_url: string | null;
  created: string;
  datastore_active: boolean;
  description: string;
  format: string;
  hash: string;
  id: string;
  last_modified: string;
  metadata_modified: string;
  mimetype: string | null;
  mimetype_inner: string | null;
  name: string;
  package_id: string;
  position: number;
  resource_type: string | null;
  size: number | null;
  state: string;
  url: string;
  url_type: string;
}

interface Tag {
  display_name: string;
  id: string;
  name: string;
  state: string;
  vocabulary_id: string | null;
}

interface Resource {
  name: string;
  notes: string;
  resource_list: ResourceList[];
  tags: Tag[];
}

export interface SearchEnvResp {
  status: string;
  message: string;
  resources: Resource[];
}
