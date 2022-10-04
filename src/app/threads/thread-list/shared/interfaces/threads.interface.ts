import { Category } from 'src/app/admin/shared/interfaces/categories.interface';
import { User } from 'src/app/users/shared/interfaces/users.interface';

export interface Thread {
  id: string;
  slug: string;
  title: string;
  content: string;
  createdBy: string | User;
  category: string;
  createdByInfo?: User;
  categoryInfo?: Category;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
