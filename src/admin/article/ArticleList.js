import React, { useState } from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import ArticleModel from "models/article.model";

export default function ArticleList(props) {
  const model = new ArticleModel();
  const { locale } = useParams();
  const [articles, updateList] = useState(model.getAll());
  let { url } = useRouteMatch();
  return (
    <div>
      <h2>Articles</h2>
      <div className="row">
        <div className="col text-right">
          <Link to={`${url}/add`}>
            <FontAwesomeIcon icon={faPlus} size="sm" className="pr-1" />
            Add New
          </Link>
        </div>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Article Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((item) => {
            return (
              <tr key={item.id}>
              <td>{moment(item.date).format('DD.MM.YYYY')}</td>
              <td>{item.i18n[locale].title}</td>
              <td>
                <Link to={`${url}/edit/${item.id}`}>Edit</Link>
                  <a href="!#"
                    className="list-delete-link"
                  onClick={(e) => {
                    e.preventDefault();
                    // eslint-disable-next-line no-restricted-globals
                    if (confirm("Delete article?")) {
                      model.delete(item.id);
                      updateList(model.getAll());
                    }
                  }}
                >
                  Delete
                </a>
              </td>
            </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  );
}
