import { useEffect, useRef, useState } from 'react';
import { fetchProducts } from '../../api/productsService';
import { Pagination, TextField } from '@mui/material';
import './Home.css';
import { Product } from '../../interfaces/IProducts';

export function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) : undefined;
  const [page, setPage] = useState<number | undefined>(initialPage);

  const [products, setProducts] = useState<Product[] | null>(null);
  const [id, setId] = useState<string>('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchProducts(page, id).then((res) => {
      setProducts(res.data);
      setTotalPages(res.total_pages);
    });
  }, [page, id]);

  const handleIdChange = (event: any) => {
    setId(event.target.value);
  };

  return (
    <div className="container">
      <TextField
        id="outlined-basic"
        label="ID"
        variant="outlined"
        value={id}
        onChange={handleIdChange}
      />

      {/* {products !== null ? (
        products?.map((product) => {
          return <div key={product.id}>{product.name}</div>;
        })
      ) : (
        <h1>No data found</h1>
      )} */}

      <pre>{JSON.stringify(products)}</pre>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => {
          setPage(value);
        }}
      />
    </div>
  );
}
