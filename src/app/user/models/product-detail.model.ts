export class Image {
  image?: string;
  thumbnail?: null;
  principal?: boolean;
  constructor() {}
}

export class SimilarBy {
  product_id?: string;
  storage?: string;
  memory?: string;
  screen_size?: null;
  os?: string;
  screen_resolution?: string;
  cpu?: null;
  gpu?: null;
  color?: string;
  colorHex?: string;
  constructor() {}
}

export class Especification {
  weight?: number;
  screen_resolution?: string;
  screen_size?: null;
  cpu?: null;
  gpu?: null;
  memory?: string;
  os?: string;
  cod?: null;
  part_number?: null;
  constructor() {}
}
export class ProductDetail {
  id?: string;
  name?: string;
  slug?: string;
  breadcrumbs?: string[];
  category?: string;
  subcategory?: null;
  brand?: string;
  model?: string;
  sku?: string;
  price?: number;
  old_price?: null;
  available?: number;
  short_description_es?: string;
  long_description_es?: null;
  short_description_en?: null;
  long_description_en?: null;
  images?: Image[];
  tag?: null;
  rating?: number;
  reviews?: number;
  conditium?: string;
  storage?: string;
  color?: string;
  colorHex?: string;
  similar_by_color?: SimilarBy[];
  similar_by_model?: SimilarBy[];
  especification?: Especification;
  constructor() {}
}
