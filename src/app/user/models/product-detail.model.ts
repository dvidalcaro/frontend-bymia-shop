export class Image {
  image?: string;
  thumbnail?: string;
  principal?: boolean;
  constructor() { }
}

export class ProductDetailClass {
  weight?: number;
  screen_resolution?: string;
  screen_size?: string;
  cpu?: string;
  gpu?: string;
  memory?: string;
  os?: string;
  cod?: string;
  part_number?: string;
  constructor() { }
}

export class ProductsByColor {
  product_id?: number;
  color?: string;
  colorHexadecimal?: string;
  active?: boolean;
  constructor() { }
}
export class ProductDetail {
  id?: string;
  name?: string;
  slug?: string;
  breadcrumbs?: string[];
  category?: string;
  subcategory?: string;
  brand?: string;
  model?: string;
  sku?: string;
  price?: number;
  old_price?: number;
  currency_id?: number;
  currency_sign?: string;
  available?: number;
  short_description_es?: string;
  long_description_es?: string;
  short_description_en?: string;
  long_description_en?: string;
  images?: Image[];
  tag?: string;
  rating?: number;
  reviews?: number;
  conditium?: string;
  products_by_color?: ProductsByColor[];
  products_models?: any;
  product_detail?: ProductDetailClass;
  constructor() { }
}
