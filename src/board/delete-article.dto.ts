import { PickType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

//PickType 난 골라서 상속받고싶어
//필요한 필드를 배열로 넣으면됨
export class DeleteArticleDto extends PickType(CreateArticleDto, [
  'password',
] as const) {}