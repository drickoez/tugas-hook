import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const apiKey = "c4377f542bee4e629a9343a0beb0f1b9";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [articles, searchQuery]);

  return (
    <div className="container mt-3">
      <h1>Latest News</h1>
      <form>
        <div className="form-group">
          <input
            type="text"
            id="search-input"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </form>
      <div className="row" id="news-container">
        {filteredArticles.map((article) => (
          <div key={article.url} className="col-md-4">
            <img
              className="w-100 mt-3"
              src={article.urlToImage}
              alt={article.title}
            />
            <h5>{article.title}</h5>
            <p>{article.description}</p>
            <p>{article.author}</p>
            <a href={article.url} className="btn btn-primary">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
