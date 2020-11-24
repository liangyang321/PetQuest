export interface Blogs {
  blogs: Blog[];
}

export class Blog {
  title: string;
  author: string;
  date: string;
  petType: string;
  content: string;
}
