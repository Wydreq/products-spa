export interface IProduct {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface ISupport {
  url: string;
  text: string;
}

export interface IApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IProduct[];
  support: ISupport;
}
