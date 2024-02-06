type ProductType = {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  imgUrls?: string[];
  categories?: string[];
  userId?: string;
  companyName?: string;
} | null;

export default ProductType;
