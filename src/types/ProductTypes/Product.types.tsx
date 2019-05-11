export type ResponseProduct = {
  body_html: string,
  id: number,
  images: ResponseImage[],
  title: string,
  variants: ResponseVariant[]
};

export type ResponseImage = {
  src100: string,
  src600: string,
  src1000: string
};

export type ResponseVariant = {
  id: number,
  inventory_quantity: number,
  option1: string,
  option2: string,
  price: string
};

export type Product = {
  colors: ProductsByColor[],
  details: string,
  id: number,
  title: string,
  images: Image[]
}

export type Image = {
  bulletClass: string,
  original: string,
  thumbnail: string
};

export type ProductsByBand = {
  size: string,
  cups: ProductsByCup[]
};

export type ProductsByCup = {
  id: number,
  price: string,
  size: string,
  stock: number
}

export type ProductsByColor = {
  hex: string,
  name: string,
  bands: ProductsByBand[]
}

export type ProductChange = {
  colorHex?: string,
  cupSize?: number,
  bandSize?: number
}
