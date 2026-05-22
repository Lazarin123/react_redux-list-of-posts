import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { Post } from '../../types/Post';
import { getAuthorPosts } from '../../api/posts';
import { Author } from '../../types/Author';

type PostsState = {
  items: Post[] | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: null,
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('posts/init', (author: Author) => {
  return getAuthorPosts(author.id);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.items = null; // eslint-disable-line no-param-reassign
      state.loaded = false; // eslint-disable-line no-param-reassign
      state.hasError = false; // eslint-disable-line no-param-reassign
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false; // eslint-disable-line no-param-reassign
        state.hasError = false; // eslint-disable-line no-param-reassign
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.items = action.payload; // eslint-disable-line no-param-reassign
      })
      .addCase(init.rejected, state => {
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.hasError = true; // eslint-disable-line no-param-reassign
      });
  },
});

export default postsSlice.reducer;
export const { clear } = postsSlice.actions;
