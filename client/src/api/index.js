import axios from 'axios';


const API = axios.create({ baseURL: 'https://travelnotes-mern.herokuapp.com/'});

//intercept HTTP requests, enables you to add listeners for various stages of making an HTTP request. front/backend authorization in every request.
API.interceptors.request.use((req) => {
   //sends token to backend and backend middleware can verify
   if(localStorage.getItem('profile')){
    //BearerToken : Bearer authentication (also called token authentication) is an HTTP authentication scheme that involves security tokens called bearer tokens.
    //The bearer token is a cryptic string, usually generated by the server in response to a login request.
       req.headers.authorization =`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
   }

   return req;
});

//sends to backend --> look server/index.js --app.use..

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);