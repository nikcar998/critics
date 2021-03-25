import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Comment } from "../models/comment";
import { PaginationMyApi } from "../models/paginationMyApi";

export default class CommentStore{
    pagination: PaginationMyApi<Comment> | null=null
    comments: Comment[] = [];
    selectedComment: Comment | null = null;
    loading = false;
    page: number = 1;

    constructor() {
        makeAutoObservable(this);
      }

      loadComments = async (id:number) => {
        this.setLoading(true);
        try {
          this.pagination = await agent.Comments.listComments(id, this.page);
          this.comments = this.pagination.data;
          this.setLoading(false);
        } catch (error) {
          this.setLoading(false);
        }
      }

      loadComment = async (id: string) => {
        this.setLoading(true);
        try {
          this.selectedComment = await agent.Comments.showComment(id);
          this.setLoading(false);
        } catch (error) {
          console.log(error);
          this.setLoading(false);
        }
      };

      storeComment =async (comment : Comment) => {
        this.setLoading(true);
        try {
          await agent.Comments.storeComment(comment);
          this.setLoading(false);
        } catch (err) {
          this.setLoading(false);
          return err;
        }
      }
    
      //function for pagination
  setPage = (plusOrNot: boolean) => {
    if (plusOrNot) {
      if (
        this.pagination &&
        this.page < this.pagination.last_page
      ) {
        this.page++;
      }
    } else {
      if (this.pagination && this.page > 1) {
        this.page--;
      }
    }
  };

    //useful to show loading component
      setLoading = (state: boolean) => {
        this.loading = state;
      };
}