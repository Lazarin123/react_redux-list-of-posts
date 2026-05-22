import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Author } from '../../types/Author';

type AuthorState = {
  author: Author | null;
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<Author>) => {
      state.author = action.payload; // eslint-disable-line no-param-reassign
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
