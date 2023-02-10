import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

//PartialType로 상속받을꺼야 (전부 상속받을래)
export class UpdateArticleDto extends PartialType(CreateArticleDto) {}