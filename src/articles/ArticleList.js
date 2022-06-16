import "./Articles.css";
import React from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import moment from "moment";
import ArticleModel from "models/article.model";

export default function ArticleList() {
  const model = new ArticleModel();
  const { locale } = useParams();
  let { url } = useRouteMatch();
  return (
    <>
      <h2 className="text-center">Articles Listing</h2>
      <div className="article-listing">
        {model.getAllActive().map((item) => {
          return (
            <Link to={`${url}/articles/${item.id}`}>
              <div key={item.id} className="item">
                <h4 className="text-primary">{item.i18n[locale].title}</h4>
                <div className="content text-dark">
                  {item.i18n[locale].content.replace(/<[^>]+>/g, "")}
                </div>
                <div className="text-secondary">
                  {moment(item.date).format("MMM DD, YYYY")}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
