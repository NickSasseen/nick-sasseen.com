import { PagedResponse } from "./models/paged-response";

const tmdbUrl = (url: string): string => [process.env.TMDB_URL_BASE, url].join("/");

const transformImagePaths = (result) => {
  if (Array.isArray(result.results)) {
    result.results.forEach((obj) => {
      // Check if 'poster_path' property exists and alter it if needed
      if (obj.poster_path) {
        obj.poster_path = TMDBApi.GetPosterImage(obj.poster_path);
      }

      if (obj.backdrop_path) {
        // Example transformation: prepend base URL to poster_path
        obj.backdrop_path = TMDBApi.GetBackdropImage(obj.backdrop_path);
      }
    });
  } else {
    // Handle single object case if needed
    if (result.poster_path) {
      // Example transformation: prepend base URL to poster_path
      result.poster_path = TMDBApi.GetPosterImage(result.poster_path);
    }
    if (result.backdrop_path) {
      result.backdrop_path = TMDBApi.GetBackdropImage(result.backdrop_path);
    }
  }
};

const tmdbFetch = async <T>(url: string) => {
  const res = await fetch(tmdbUrl(url), {
    headers: TMDBApi.Headers,
  });
  const result: T = await res.json();
  transformImagePaths(result);
  return result;
};

const TMDBApi = {
  // helpers
  Headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
  GetBackdropImage: (path: string) => `${process.env.TMDB_IMG_BASE}/w1280${path}`,
  GetPosterImage: (path: string) => `${process.env.TMDB_IMG_BASE}/w500${path}`,
  // endpoint lists
  Discover: {
    Movie: async (params) => {
      const queryString = [
        "language=en-US",
        ...Object.keys(params).map((key, index, array) => `${key}=${params[key]}`),
      ].join("&");
      return tmdbFetch<PagedResponse<any>>(`discover/movie?${queryString}`);
    },
  },
  MovieLists: {
    Popular: async (page: number = 1) => {
      const queryString = `page=${page}&language=en-US`;
      return tmdbFetch<PagedResponse<any>>(`movie/popular?${queryString}`);
    },
  },
  Movies: {
    Details: async (id: number) => {
      const appends = ["credits", "recommendations"].join(",");
      return tmdbFetch<any>(`movie/${id}?append_to_response=${appends}&language=en-US`);
    },
  },
  Search: {
    Movie: async (query: string, page: number = 1) => {
      const queryString = `query=${query}&page=${page}&language=en-US`;
      return tmdbFetch<PagedResponse<any>>(`search/movie?${queryString}`);
    },
    Multi: async (query: string, page: number = 1) => {
      const queryString = `query=${query}&page=${page}&language=en-US`;
      return tmdbFetch<PagedResponse<any>>(`search/multi?${queryString}`);
    },
    Tv: async (query: string, page: number = 1) => {
      const queryString = `query=${query}&page=${page}&language=en-US`;
      return tmdbFetch<PagedResponse<any>>(`search/tv?${queryString}`);
    },
  },
  Trending: {
    All: async (window: "day" | "week" = "day") => {
      const queryString = `language=en-US`;
      return tmdbFetch<PagedResponse<any>>(`trending/all/${window}?${queryString}`);
    },
  },
  TvSeriesLists: {
    Popular: async (page: number = 1) => {
      return await fetch(tmdbUrl("tv/popular"), {
        headers: TMDBApi.Headers,
      }).then<PagedResponse<any>>((res) => res.json());
    },
  },
  TvSeries: {
    Details: async (id: number) => {
      const appends = ["credits", "recommendations"].join(",");
      return tmdbFetch<any>(`tv/${id}?append_to_response=${appends}&language=en-US`);
    },
  },
  // pseudo endpoints
  BothPopular: async (page: number = 1) => {
    const combined = await Promise.all([
      TMDBApi.MovieLists.Popular(page),
      TMDBApi.TvSeriesLists.Popular(page),
    ]);
    return combined.flatMap((array) => array.results);
  },
};

export default TMDBApi;
