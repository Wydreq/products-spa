import { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/productsService';
import { Pagination, TextField } from '@mui/material';
import './Home.css';
import { IProduct } from '../../interfaces/IProducts';
import { ProductsTable } from '../../components/ProductsTable/ProductsTable';
import { ProductModal } from '../../components/ProductModal/ProductModal';
import { useNavigate } from 'react-router-dom';
import { ErrorSnackbar } from '../../components/Snackbar/ErrorSnackbar';
import { AxiosError } from 'axios';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { getErrorMessageByCode } from '../../helpers/getErrorMessageByCode';
import { loadingActions } from '../../store';
import { useSelector, useDispatch } from 'react-redux';

export function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  const idParam = urlParams.get('id');
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState<number | undefined>(initialPage);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
  const [id, setId] = useState<string>(idParam ? idParam : '');
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const loading = useSelector((state: any) => state.loading);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page!.toString());
    if (id.trim() !== '') {
      params.set('id', id);
    }
    navigate(`?${params.toString()}`);
  }, [page, id, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(loadingActions.setLoadingTrue());
      fetchProducts(page, id)
        .then((res) => {
          Array.isArray(res.data)
            ? setProducts(res.data)
            : setProducts([res.data]);
          setTotalPages(res.total_pages ? res.total_pages : 1);
          dispatch(loadingActions.setLoadingFalse());
        })
        .catch((err: AxiosError) => {
          setErrorMessage(
            getErrorMessageByCode(err.response!.status.toString())
          );
          setProducts([]);
          dispatch(loadingActions.setLoadingFalse());
        });
    }, 500);
    return () => clearTimeout(timer);
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
