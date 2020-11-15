export interface Blogs {
  blogs: Blog[];
}

export interface Blog {
  title: string;
  author: string;
  date: string;
  petType: string;
  content: string;
}
