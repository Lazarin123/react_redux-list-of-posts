import { client } from '../utils/fetchClient';
import { author } from '../types/author';

export const getAuthors = () => {
  return client.get<Author[]>('/Authors');
};

export const getAuthor = (id: number) => {
  return client.get<Author[]>(`/Authors/${id}`);
};
