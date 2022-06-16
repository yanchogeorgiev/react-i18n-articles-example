import { v4 as uuid } from "uuid";

export default class ArticleModel {
  getAll() {
    return JSON.parse(localStorage.getItem("articles") || null) || [];
  }

  getAllActive() {
    return this.getAll()
      .filter((item) => item.active)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  delete(id) {
    const articles = this.getAll();
    const i = articles.findIndex((item) => item.id === id);
    articles.splice(i, 1);
    localStorage.setItem("articles", JSON.stringify(articles));
  }

  save(item, id) {
    const articles = this.getAll();
    if (!id) {
      item.id = uuid();
      articles.push(item);
    } else {
      const i = articles.findIndex((article) => article.id === item.id);
      item.id = id;
      articles[i] = item;
    }
    localStorage.setItem("articles", JSON.stringify(articles));
  }

  get(id) {
    const articles = this.getAll();
    return articles.find((item) => item.id === id);
  }

  getPrevActiveId(id) {
      const items = this.getAllActive();
      const i = items.findIndex(item => item.id === id);
      if (i > 0) return items[i-1].id;
  }

  getNextActiveId(id) {
    const items = this.getAllActive();
    const i = items.findIndex(item => item.id === id);
    if (i > -1 && i < items.length - 1) return items[i+1].id;
  }
}
