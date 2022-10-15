import { Category } from 'src/app/admin/shared/interfaces/categories.interface';
import { User } from 'src/app/users/shared/interfaces/users.interface';

import { OutputBlockData } from '$shared/interfaces/editorjs.interface';

export interface Thread {
  id: string;
  slug: string;
  title: string;
  description: string;
  blocks: OutputBlockData[];
  createdBy: string | User;
  category: string;
  createdByInfo?: User;
  categoryInfo?: Category;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface CreateThreadDto extends Pick<Thread, 'title'> {
  categoryId: string;
  tagIds: string[];
  description: string;
  blocks: OutputBlockData[];
}
