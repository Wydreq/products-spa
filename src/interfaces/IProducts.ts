export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface Support {
  url: string;
  text: string;
}

export interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Product[];
  support: Support;
}
