// constants for API
const apiKey = '' // You should register for your private key.
const root = 'https://api.themoviedb.org/3'

export const POSTER_MOVIE_IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
export const BG_MOVIE_URL = 'https://image.tmdb.org/t/p/w1400_and_h450_face/'
export const POSTER_MOVIE_IMG_URL_LARGE = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'
export const MOVIE_SEARCH_URL = `${root}/search/movie?api_key=${apiKey}&language=en-US&include_adult=false`
export const MOVIES_SORT_BY_POPULARITY = `${root}/discover/movie?include_video=false&include_adult=false&language=en-US&api_key=${apiKey}&sort_by=popularity`
export const MOVIES_SORT_BY_RATE = `${root}/discover/movie?certification_country=US&certification=R&api_key=${apiKey}&sort_by=vote_average`
export const MOVIES_SORT_BY_DATE = `${root}/discover/movie?certification_country=US&certification=R&api_key=${apiKey}&sort_by=primary_release_date`
export const MOVIE_DETAILS_A = `${root}/movie/`
export const MOVIE_DETAILS_B = `?api_key=${apiKey}&append_to_response=credits`
