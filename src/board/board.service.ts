import _ from 'lodash'
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class BoardService {
  //원래는 Repository를 참조해서 비지니스 로직을 실행하기 위해 데이터베이스를 통신!
  //하지만 여기선 편의성을 위해 인-메모리 변수로 작성됨

  private articles = [];
  private articlePasswords = new Map(); // {articleId - password}, {articleId - password}, {articleId - password}


  getArticles(){
    return this.articles;
  }
  getArticlesById(id: number){
    return this.articles.find((article) => {
     return article.id === id;
    })
  }
  createArticle(title:string, content:string, password:number) {
  //id를 매겨야함
    const articleId = this.articles.length + 1;
    this.articles.push({id:articleId, title, content });
    this.articlePasswords.set(articleId,password);
    return articleId;
  }
  updateArticle(id:number, title:string, content:string, password:number) {
    if (this.articlePasswords.get(id) !== password) {
      throw new UnauthorizedException(
        `Article password is not correct. id: ${id}`,
      );
    }
    const article = this.getArticlesById(id);
    if (_.isNil(article)){
      throw new NotFoundException(`게시글을 찾지 못했습니다. id: ${id}`);
    }
    article.title = title;
    article.content = content;
  }
  deleteArticle(id: number, password: number) {
    if (this.articlePasswords.get(id) !== password) {
      throw new UnauthorizedException(
        `게시글 비밀번호가 일치하지 않습니다. id: ${id}`,
      );
    }

    this.articles =
      this.articles.filter((article) => {
        return article.id !== id
      });
  }

}
