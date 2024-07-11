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
  GetPosterImage: (path: string) => `${process.env.TMDB_IMG_BASE}/w500${path}`,
  // endpoint lists
  Discover: {
    Movie: async (params) => {
      const queryString = [
        "language=en-US",
        ...Object.keys(params).map((key, index, array) => `${key}=${params[key]}`)
      ].join("&")
      return tmdbFetch<PagedResponse<any>>(`discover/movie?${queryString}`);
    }
  },
  MovieLists: {
    Popular: async (page: number = 1) => {
      const queryString = `page=${page}&language=en-US`;
      return tmdbFetch<PagedResponse<any>>(`movie/popular?${queryString}`);
    } 
  }, 
  Movies: {
    Details: async (id: number) => {
      const appends = [
        "credits", 
        "recommendations"
      ].join(',')
      return tmdbFetch<any>(`movie/${id}?append_to_response=${appends}&language=en-US`)
    }
  },
  Trending: {
    All: async (window: "day" | "week" = "day") => {
      const queryString = `language=en-US`;
      return tmdbFetch<PagedResponse<any>>(`trending/all/${window}?${queryString}`);
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
    const combined = await Promise.all([
      TMDBApi.MovieLists.Popular(page),
      TMDBApi.TvSeriesLists.Popular(page)
    ]);
    return combined.flatMap((array) => array.results);
  }
}

export default TMDBApi;