import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BoardService } from "./board.service";
import { CreateArticleDto } from "./create-article.dto";
import { UpdateArticleDto } from "./update-article.dto";
import { DeleteArticleDto } from "./delete-article.dto";

@Controller('board') // routing path -> /board -> e.g. http://localhost:3000/board
export class BoardController {
    //서비스를 주입해야함
    constructor(private readonly boardService: BoardService) {}

    //게시물 목록 가져오기 API
    @Get('/articles')
    getArticles() {
        return this.boardService.getArticles();
    }
    // 게시물 상세보기 -> 게시물 ID
    // 여기서 number 타입의 articleId로 id라는 파라미터를 받으려고 했지만 실제로 articleId의 타입은 string
    // URI에 들어가는 파라미터는 항상 string으로 표현되기 때문입니다. 그래서, 위에서 아까 얘기했던 class-transformer를
    // 사용해야 함
    //main.ts transform : true
    @Get('/articles/:id')
    getArticleById(
      @Param('id') articleId: number) {
        return this.boardService.getArticlesById(articleId);
    }

    //게시물 작성
    @Post('/articles')
    createArticle(@Body() data: CreateArticleDto) {
        return this.boardService.createArticle(
          data.title,
          data.content,
          data.password);
    }

    //게시물 수정
    @Put('/articles/:id')
    updateArticle(
      @Param('id') articleId: number,
      @Body() data: UpdateArticleDto
    ) {
        return this.boardService.updateArticle(articleId,
          data.title,
          data.content,
          data.password);
    }
    @Delete('/articles/:id')
    deleteArticle(
      @Param('id') articleId: number,
      @Body() data: DeleteArticleDto,
      ) {
        return this.boardService.deleteArticle(articleId, data.password);
    }
}
