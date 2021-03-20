import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { PaginationMyApi } from "../models/paginationMyApi";
import { Review } from "../models/review";

export default class ReviewStore {
  reviewsPagination: PaginationMyApi<Review> | null = null;
  reviews: Review[] = [];
  selectedReview: Review | null = null;
  loading = false;
  page = 1;
  constructor() {
    makeAutoObservable(this);
  }

  loadReviews = async () => {
    this.setLoading(true);
    try {
      this.reviewsPagination = await agent.Reviews.listReviews(this.page);
      this.reviews = this.reviewsPagination.data;
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  storeReview = async () => {
    
  }

  setPage = (plusOrNot: boolean) => {
    if (plusOrNot) {
      if (
        this.reviewsPagination &&
        this.page < this.reviewsPagination.last_page
      ) {
        this.page++;
      }
    } else {
      if (this.reviewsPagination && this.page > 1) {
        this.page--;
      }
    }
  };
  setLoading = (state: boolean) => {
    this.loading = state;
  };
}
