const URL = "http://localhost:8080/opskrift_solo_war_exploded";


function handleHttpErrors(res) {
 if (!res.ok) {
  console.log(res.status)
   return Promise.reject({ status: res.status, fullError: res.json() })
 }
 return res.json();
}


function apiFacade() {

const login = (user, password) => {    
    const options = makeOptions("POST", true,{username: user, password: password });
    return fetch(URL + "/api/login", options).then(handleHttpErrors).then(res => {setToken(res.token)})
}

const fetchData = (ressource) => { 
    const options = makeOptions("GET",true); //True add's the token
    return fetch(URL + ressource, options).then(handleHttpErrors);
}

const makeOptions= (method,addToken,body) => {
   var opts = {
     method: method,
     headers: {
       "Content-type": "application/json",
       'Accept': 'application/json',
     }
   }
   if (addToken && loggedIn()) {
     opts.headers["x-access-token"] = getToken();
   }
   if (body) {
     opts.body = JSON.stringify(body);
   }
   return opts;
}


const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
}
const getToken = () => {
    return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
}
const logout = () => {
    localStorage.removeItem("jwtToken");
}

function readJWTTokken(token) {
    console.log('TOKEN: ', token);
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
}


const getAllRecipes = async () => {
  const options = makeOptions("GET", true, null);
  return fetch(URL + `/api/recipe/all`, options).then(r => r.json());
      
}

const getAllIngredients = () => {
  const options = makeOptions("GET",true, null);
  return fetch(URL + `/api/ingredient/all`, options).then(r => r.json());
}

const getAllReviews = () => {
  const options = makeOptions("GET", true, null);
  return fetch(URL + `/api/review/all`, options).then(r => r.json());
}
      
const createRecipe = (recipe) => {
  const options = makeOptions("POST", true, recipe);
  return fetch(URL + `/api/recipe`, options).then(r => r.json());
}
 
 
 return {
    createRecipe,
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    readJWTTokken,
    getAllRecipes,
    getAllIngredients,
 }

}
const facade = apiFacade();
export default facade;
