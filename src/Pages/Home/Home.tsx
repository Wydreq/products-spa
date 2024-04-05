import { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/productsService';
import { Pagination, TextField } from '@mui/material';
import './Home.css';
import { IProduct } from '../../interfaces/IProducts';
import { ProductsTable } from '../../components/ProductsTable/ProductsTable';
import { ProductModal } from '../../components/ProductModal/ProductModal';
import { ErrorSnackbar } from '../../components/Snackbar/ErrorSnackbar';
import { AxiosError } from 'axios';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { getErrorMessageByCode } from '../../helpers/getErrorMessageByCode';
import { loadingActions } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';

export function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  const idParam = urlParams.get('id');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(initialPage ?? 1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
  const [id, setId] = useState<string>(idParam ? idParam : '');
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const loading = useSelector((state: any) => state.loading);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('popstate', () => {
      fetchTableProducts();
    });
    return () =>
      window.removeEventListener('popstate', () => {
        fetchTableProducts();
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({
        pathname: '/',
        search: createSearchParams({
          page: `${page}`,
          id: `${id}`,
        }).toString(),
      });
      fetchTableProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [page, id]);

  const fetchTableProducts = () => {
    dispatch(loadingActions.setLoadingTrue());
    fetchProducts(page, id)
      .then((res) => {
        console.log(res);
        Array.isArray(res.data)
          ? setProducts(res.data)
          : setProducts([res.data]);
        setTotalPages(res.total_pages ? res.total_pages : 1);
        res.page && setPage(res.page);
        dispatch(loadingActions.setLoadingFalse());
      })
      .catch((err: AxiosError) => {
        setErrorMessage(getErrorMessageByCode(err.response!.status.toString()));
        setProducts([]);
        dispatch(loadingActions.setLoadingFalse());
      });
  };

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
      {products.length > 0 && (
        <ProductsTable
          products={products}
          onProductClick={(product: IProduct) => {
            setCurrentProduct(product);
            setIsModalOpen(true);
          }}
        />
      )}
      {!loading && products.length === 0 && <h1>No products found</h1>}
      {loading && <LoadingSpinner />}
      {products.length > 0 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => {
            setPage(value);
          }}
        />
      )}
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
