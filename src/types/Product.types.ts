export type ResponseImage = {
  src100: string,
  src600: string,
  src1000: string
};

export type Variant = {
  id: number,
  price: string,
  option1: string,
  option2: string,
  inventory_quantity: number
};

export interface ResponseProduct {
  id: number,
  title: string,
  body_html: string,
  images: ResponseImage[],
  variants: Variant[]
}
