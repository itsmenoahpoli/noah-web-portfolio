export interface Blog {
  id: number;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  author: string;
  tags?: string[];
  image?: string;
  slug: string;
}

export const blogs: Blog[] = [];

