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
  braSet: BraSet,
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

export type Bras = {
  [size: string]: BraCup[]
};

export type BraCup = {
  cupSize: string,
  id: number,
  price: string,
  stock: number
}

export type BraSet = {
  [bra: string]: Bras
}
