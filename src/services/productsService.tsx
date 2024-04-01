import axios, { AxiosResponse } from 'axios';
import { IApiResponse } from '../interfaces/IProducts';

const API_BASE_URL = 'https://reqres.in/api/products/';

export function fetchProducts(
  page: number | undefined,
  id: string | null
): Promise<IApiResponse> {
  let API_URL = API_BASE_URL;

  if (page !== null) {
    API_URL += `?page=${page}`;
  }

  if (id !== null) {
    API_URL += `${page !== null ? '&' : '?'}id=${id}`;
  }

  API_URL += `${page === null && id === null ? '?' : '&'}per_page=5`;

  return axios
    .get(API_URL)
    .then((res: AxiosResponse<IApiResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}
