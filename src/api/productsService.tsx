import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from '../interfaces/IProducts';

const API_BASE_URL = 'https://reqres.in/api/products/';

export function fetchProducts(
  page: number | undefined,
  id: string | null
): Promise<ApiResponse> {
  let API_URL = API_BASE_URL;

  if (page !== null) {
    API_URL += `?page=${page}`;
  }

  if (id !== null) {
    API_URL += `${page !== null ? '&' : '?'}id=${id}`;
  }

  return axios
    .get(API_URL)
    .then((res: AxiosResponse<ApiResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}
