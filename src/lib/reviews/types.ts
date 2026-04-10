export type GoogleReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
};

export type PlacesApiReview = {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
};

export type PlacesApiResponse = {
  result?: { reviews?: PlacesApiReview[] };
  status: string;
  error_message?: string;
};