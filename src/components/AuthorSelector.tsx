import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as authorActions from '../features/Author/authorSlice';
import * as authorsActions from '../features/Authors/authorsSlice';

export const AuthorSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);
  const { authors, loaded, loading } = useAppSelector(state => state.authors);

  const { author: selectedAuthor } = useAppSelector(state => state.author);

  useEffect(() => {
    if (!loaded && !loading) {
      dispatch(authorsActions.init());
    }
  }, [dispatch, loaded, loading]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span>{selectedAuthor?.name || 'Choose a author'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {authors.map(author => (
            <a
              key={author.id}
              href={`#user-${author.id}`}
              onClick={() => {
                dispatch(authorActions.setAuthor(author));
              }}
              className={classNames('dropdown-item', {
                'is-active': author.id === selectedAuthor?.id,
              })}
            >
              {author.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
