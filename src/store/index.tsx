import { configureStore, createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: true,
  reducers: {
    setLoadingTrue(state) {
      return true;
    },
    setLoadingFalse(state) {
      return false;
    },
  },
});

const store = configureStore({
  reducer: { loading: loadingSlice.reducer },
});

export const loadingActions = loadingSlice.actions;
export default store;
