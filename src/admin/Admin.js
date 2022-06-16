import "./Admin.css";
import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import ArticleList from "./article/ArticleList";
import ArticleEdit from "./article/ArticleEdit";
import LangSwitch from "shared/LangSwitch";

export default function Admin() {
  let { path } = useRouteMatch();
  return (
    <div className="container pt-4">
      <Switch>
        <Route path={`${path}/:locale`}>
          <AdminRoutes />
        </Route>
        <Redirect to={`${path}/en`} />
      </Switch>
    </div>
  );
}

function AdminRoutes() {
  let { path } = useRouteMatch();
  return (<>
    <LangSwitch baseUrl="/admin/" />
    <Switch>
      <Route path={`${path}/articles`}>
        <ArticleRoutes />
      </Route>
      <Redirect to={`${path}/articles`} />
    </Switch>
  </>);
}

function ArticleRoutes() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/add`}>
        <ArticleEdit />
      </Route>
      <Route path={`${path}/edit/:id`}>
        <ArticleEdit />
      </Route>
      <Route path={`${path}`}>
        <ArticleList />
      </Route>
    </Switch>
  );
}
