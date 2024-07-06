import { PagedResponse } from "./models/paged-response";

const tmdbUrl = (url: string): string => [process.env.TMDB_URL_BASE, url].join('/');

const tmdbFetch = <T,>(url: string) => {
  return fetch(tmdbUrl(url), {
    headers: TMDBApi.Headers
  }).then<T>(res => res.json());
};

const TMDBApi = {
  // helpers
  Headers: {
    "Accept": "application/json",
    "Authorization": `Bearer ${process.env.TMDB_API_KEY}`
  },
  GetBackdropImage: (path: string) => `${process.env.TMDB_IMG_BASE}/w1280${path}`,
  GetPosterImage: (path: string) => `${process.env.TMDB_IMG_BASE}/w720${path}`,
  // endpoint lists
  MovieLists: {
    Popular: async (page: number = 1) => {
      const queryString = `page=${page}&language=en-US`;
      return tmdbFetch<any>(`movie/popular?${queryString}`);
    } 
  }, 
  TvSeriesLists: {
    Popular: async (page: number = 1) => {
      return await fetch(tmdbUrl("tv/popular"), {
        headers: TMDBApi.Headers
      }).then<PagedResponse<any>>(res => res.json());
    }
  }, 
  // pseudo endpoints
  BothPopular: async (page: number = 1) => {
    return await Promise.all([
      TMDBApi.MovieLists.Popular(page),
      TMDBApi.TvSeriesLists.Popular(page)
    ])
  }
}

export default TMDBApi;