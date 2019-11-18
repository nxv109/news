import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getSearchNews } from "../../actions/new.action";

export default function Search() {
  const [isSearch, setIsSearch] = React.useState(false);
  const textSearch = React.useRef("");
  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  const hanldeChangeSearch = () => {
    if (textSearch.current.value.length >= 2) {
      setIsSearch(true);
      dispatch(getSearchNews(textSearch.current.value));
    } else {
      setIsSearch(false);
    }
  };

  document.addEventListener("click", () => {
    setIsSearch(false);
  });

  return (
    <div className="search">
      <input
        className="form-control mr-sm-2 search__input"
        type="search"
        placeholder="Search..."
        ref={textSearch}
        onChange={hanldeChangeSearch}
      />
      {isSearch ? (
        appState.news.search ? (
          appState.news.search.length > 0 ? (
            <div className="search__result w-100 p-1 rounded shadow-lg">
              {appState.news.search.map((item, index) => (
                <Link
                  to={`/${item._id}`}
                  key={index}
                  className="latest-new p-1 bg-white rounded text-decoration-none text-dark"
                >
                  <div className="latest-new__image">
                    <img
                      src={`/uploads/news/${item.articlePicture}`}
                      alt={item.title}
                    />
                  </div>
                  <div className="latest-new__info">
                    <h6 className="latest-new__title search__title">
                      {item.title}
                    </h6>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="search__result w-100 p-1 text-secondary text-center rounded shadow-lg">
              No result
            </div>
          )
        ) : null
      ) : null}
    </div>
  );
}
