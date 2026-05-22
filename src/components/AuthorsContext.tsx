import React, { useEffect, useState } from 'react';
import { getAuthors } from '../api/author';
import { Author } from '../types/Author';

export const AuthorContext = React.createContext<Author[]>([]);

type Props = {
  children: React.ReactNode;
};

export const AuthorsProvider: React.FC<Props> = ({ children }) => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    getAuthors().then(setAuthors);
  }, []);

  return <AuthorContext.Provider value={authors}>{children}</AuthorContext.Provider>;
};
