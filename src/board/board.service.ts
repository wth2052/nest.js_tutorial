import _ from 'lodash'
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm"
import { Article } from "./article.entity";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>
  ){}
  
  //원래는 Repository를 참조해서 비지니스 로직을 실행하기 위해 데이터베이스를 통신!
  //하지만 여기선 편의성을 위해 인-메모리 변수로 작성됨

  private articles = [];
  //비밀번호 저장을 위한 Map 객체
  private articlePasswords = new Map(); // {articleId - password}, {articleId - password}, {articleId - password}


  async getArticles() {
    return await this.articleRepository.find({
      where: { deletedAt: null },
      select: ["id", "author", "title", "createdAt"],
    });
  }
  async getArticlesById(id: number){
    return await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ["author", "title", "content", "createdAt", "updatedAt"],
    });
  }
  //async await 여기 안쓰는이유? //기타함수는 findOne 목록 받아온걸 보장해야함, 허나 여기는
  //아! 생성됐음! 이라는 응답을 주지 않아도 됨.
  createArticle(title:string, content:string, password:number) {
  // //id를 매겨야함
  //   const articleId = this.articles.length + 1;
  //   this.articles.push({id:articleId, title, content });
  //   this.articlePasswords.set(articleId,password);
  //   return articleId;\
    this.articleRepository.insert({
      author: "test",
      title,
      content,
      password:password.toString(),
    })
  }
  async updateArticle(id:number,
                      title:string,
                      content:string,
                      password:number)
  {
    await this.verifyPassword(id, password);
    await this.articleRepository.update(id,{title, content})
  }

  async deleteArticle(id: number, password: number) {
    await this.verifyPassword(id, password);
    await this.articleRepository.softDelete(id);
  }
  private async verifyPassword(id: number, password: number) {
    const article = await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ["password"],
    });

    if (_.isNil(article)) {
      throw new NotFoundException(`게시글을 찾을 수 없습니다. ${id}`);
    }
    if (article.password !== password.toString()) {
      throw new UnauthorizedException(`패스워드가 일치하지 않습니다 ${id}`);
    }
  }


}
