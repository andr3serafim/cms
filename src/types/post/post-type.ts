import { AuthorType } from "./author-type";

export type GetPostType = {
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    author: AuthorType;
}
