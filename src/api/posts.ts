import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getAuthorPosts = (authorId: number) => {
  return client.get<Post[]>(`/posts?authorId=${authorId}`);
};

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};
