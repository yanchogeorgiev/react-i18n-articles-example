
import ArticleList from "articles/ArticleList";
import ArticleView from "articles/ArticleView";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LangSwitch from "shared/LangSwitch";

export default function App() {
    return (
      <div className="container pt-4">
        <Switch>
        <Route path={`/:locale/articles/:id`}>
            <LangSwitch baseUrl="/" />
            <ArticleView />
          </Route>
          <Route path={`/:locale`}>
            <LangSwitch baseUrl="/" />
            <ArticleList />
          </Route>
          <Redirect to={`/en`} />
        </Switch>
      </div>
    );
  }