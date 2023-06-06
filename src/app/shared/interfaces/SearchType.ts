interface item {
  id: string;
  name: string;
}

export interface SearchType {
  title: string;
  slug: string;
  items: item[];
}
