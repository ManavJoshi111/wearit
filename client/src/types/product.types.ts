type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  imgUrls: string[];
  categories: string[];
  userId: string;
  companyName: string;
} | null;

export default ProductType;
