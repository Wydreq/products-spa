import { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/productsService';
import { Pagination, TextField } from '@mui/material';
import './Home.css';
import { IProduct } from '../../interfaces/IProducts';
import { ProductsTable } from '../../components/ProductsTable/ProductsTable';
import { ProductModal } from '../../components/ProductModal/ProductModal';
import { useNavigate } from 'react-router-dom';
import { ErrorSnackbar } from '../../components/Snackbar/ErrorSnackbar';
import { error } from 'console';

export function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  const idParam = urlParams.get('id');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  const navigate = useNavigate();

  const [page, setPage] = useState<number | undefined>(initialPage);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
  const [id, setId] = useState<string>(idParam ? idParam : '');
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page!.toString());
    if (id.trim() !== '') {
      params.set('id', id);
    }
    navigate(`?${params.toString()}`);
  }, [page, id, navigate]);

  useEffect(() => {
    fetchProducts(page, id)
      .then((res) => {
        Array.isArray(res.data)
          ? setProducts(res.data)
          : setProducts([res.data]);
        setTotalPages(res.total_pages ? res.total_pages : 1);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }, [page, id]);

  const handleIdChange = (event: any) => {
    const { value } = event.target;
    const endVal = value.replace(/\D/g, '');
    setId(endVal);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      <ProductsTable
        products={products}
        onProductClick={(product: IProduct) => {
          setCurrentProduct(product);
          setIsModalOpen(true);
        }}
      />
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => {
          setPage(value);
        }}
      />
      {isModalOpen && (
        <ProductModal closeModal={closeModal} product={currentProduct} />
      )}
      {errorMessage && (
        <ErrorSnackbar
          label={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      )}
    </div>
  );
}
