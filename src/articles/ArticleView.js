import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArticleModel from "models/article.model";
import moment from "moment";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function ArticleView() {
  const model = new ArticleModel();
  const { locale, id } = useParams();
  const item = model.get(id);
  const prevId = model.getPrevActiveId(item.id);
  const nextId = model.getNextActiveId(item.id);

  return (
    <div className="article-view">
      <h2 className="text-center">Article Details</h2>
      <h4 className="text-center text-primary">{item.i18n[locale].title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: item.i18n[locale].content }}
      ></div>
      <div className="text-secondary date">
        {moment(item.date).format("MMM DD, YYYY")}
      </div>
      <div className="row">
        <div className="col">
          {prevId ? <Link to={`/${locale}/articles/${prevId}`}>
            &lt; Previous
          </Link> : ''}
          {prevId && nextId ? <span>&nbsp;|&nbsp;</span> : ''}
          {nextId ? <Link to={`/${locale}/articles/${nextId}`}>
            Next &gt;
          </Link> : ''}
        </div>
        <div className="back-btn">
          <Link to={`/${locale}`}><FontAwesomeIcon icon={faArrowLeft} size="sm" className="pr-1" /> Back to listing</Link>
        </div>
      </div>
    </div>
  );
}
