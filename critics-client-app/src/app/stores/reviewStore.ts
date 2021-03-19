import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { PaginationMyApi } from "../models/paginationMyApi";
import { Review } from "../models/review";

export default class ReviewStore {
  reviewsPagination: PaginationMyApi<Review> | null = null;
  reviews: Review[] = [];
  selectedReview: Review | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadReviews = async (page: number) => {
    if (0 <= page && page <= 5) {
      this.setLoading(true);
      const pageString = Math.floor(page).toString();
      try {
        this.reviewsPagination = await agent.Reviews.listReviews(pageString);
        this.reviews = this.reviewsPagination.data
        this.setLoading(false);
      } catch (error) {
        console.log(error);
        this.setLoading(false);
      }
    }
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };
}
