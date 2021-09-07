import { AUTH, LOGOUT } from "../constants/actionTypes"

const authReducer = (state = { authData: null }, action) => {
    switch (action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            
            return { ...state, authData: action.data};
        case LOGOUT:
            localStorage.clear();

            return { ...state, authData: null};
        default: 
            return state;
    }
}

export default authReducer;

/*
1. localStorage.setItem('profile', JSON.stringify({...action?.data}))
--> converts the JSON k:v pairs into strings under a key name called profile in our localstorage found in out browser.
2. LOGOUT type clears the localStorage therefore having no loggedIn status when navigating. 
*/