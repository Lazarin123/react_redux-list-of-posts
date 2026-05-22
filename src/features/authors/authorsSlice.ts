import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Author } from '../../types/Author';
import { getAuthors } from '../../api/author';

type AuthorsState = {
  authors: Author[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
};

const initialState: AuthorsState = {
  authors: [],
  loading: false,
  loaded: false,
  error: false,
};

export const init = createAsyncThunk('authors/init', () => {
  return getAuthors();
});

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = true; // eslint-disable-line no-param-reassign
        state.error = false; // eslint-disable-line no-param-reassign
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false; // eslint-disable-line no-param-reassign
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.authors = action.payload; // eslint-disable-line no-param-reassign
      })
      .addCase(init.rejected, state => {
        state.loading = false; // eslint-disable-line no-param-reassign
        state.error = true; // eslint-disable-line no-param-reassign
      });
  },
});

export default authorsSlice.reducer;
