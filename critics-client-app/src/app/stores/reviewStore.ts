import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { PaginationMyApi } from "../models/paginationMyApi";
import { Review, ReviewForShow } from "../models/review";

export default class ReviewStore {
  pagination: PaginationMyApi<Review> | null = null;
  reviews: Review[] = [];
  selectedReview: ReviewForShow | null = null;
  loading = false;
  page = 1;


  constructor() {
    makeAutoObservable(this);
  }

  //this function will upload the review list in 2 variables, "this.reviews" that will keep the used reviews
  //and "this.pagination" useful for pagination functions
  loadReviews = async () => {
    this.setLoading(true);
    try {
      this.pagination = await agent.Reviews.listReviews(this.page);
      this.reviews = this.pagination.data;
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  //load the reviews of a user
  loadUserReviews = async (id:number) => {
    this.setLoading(true);
    try {
      this.pagination = await agent.Reviews.listUserReviews(this.page,id);
      this.reviews = this.pagination.data;
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  //show all reviews
  loadAllReviews = async () => {
    this.setLoading(true);
    try {
      this.pagination = await agent.Reviews.listAllReviews(this.page);
      this.reviews = this.pagination.data;
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  //load a single review with like and comments(?)
  loadReview = async (id: string) => {
    this.setLoading(true);
    try {
      this.selectedReview = await agent.Reviews.show(id);
      this.setLoading(false);
    } catch (error) {
      console.log(error);
      this.setLoading(false);
    }
  };

  //here i will store a review and set errors if present
  storeReview = async (review: Review) => {
    this.setLoading(true);
    try {
      await agent.Reviews.store(review);
      this.setLoading(false);
    } catch (err) {
      this.setLoading(false);
      throw err;
    }
  };

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
