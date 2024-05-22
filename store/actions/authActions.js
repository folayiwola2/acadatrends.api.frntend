import { post, get } from '../../../config/apiRequest'

export const getAdminProfile = (cb) => {
    return (dispatch, getState) => {
        get(`/admin`).then((response) => {
            console.log("Admin reponse ()=>", response);
            if (response.status === "Success") {
                dispatch({ type: "FETCH_ADMIN_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "FETCH_ADMIN_SUCCESS", response });
                localStorage.setItem('fetchAdmin', JSON.stringify(response.data));
            } else {
                dispatch({ type: "FETCH_ADMIN_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}

export const signIn = (credentials, cb) => {
    return (dispatch, getState) => {
        post(`/admin/authenticate`, credentials).then((response) => {
            console.log("SignIn reponse ()=>", response);
            if (response.status === "Success") {
                dispatch({ type: "LOGIN_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "LOGIN_SUCCESS", response });
                localStorage.setItem('admin', JSON.stringify(response.data));
            } else {
                dispatch({ type: "LOGIN_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}


export const signUp = (credentials, cb) => {
    return (dispatch, getState) => {
        post(`/admin/register`, credentials).then((response) => {
            console.log("signUp response ()=>", response);
            if (response.status === 'Success') {
                dispatch({ type: 'SIGNUP_SUCCESS', response });
                if (typeof cb === "function") cb({ type: "SIGNUP_SUCCESS", response });
                localStorage.setItem('admin', JSON.stringify(response.data));
            } else {
                dispatch({ type: 'SIGNUP_ERROR', response });
                if (typeof cb === "function") cb();
            }

        })
    }
}

export const forgotPassword = (credentials, cb) => {
    return (dispatch, getState) => {
        post(`/admin/forgot-password`, credentials).then(response => {
            // console.log("ForgotPassword response", response);
            if (response.status === "success") {
                dispatch({ type: "FORGET_PASSWORD_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "FORGET_PASSWORD_SUCCESS", response });
            } else {
                dispatch({ type: "FORGET_PASSWORD_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}

export const resetUserPassword = (credentials, cb) => {
    console.log(credentials, cb)
    return (dispatch, getState) => {
        post(`/user/reset-password`, credentials).then(response => {
            if (response.status === "success") {
                dispatch({ type: "FORGET_PASSWORD_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "FORGET_PASSWORD_SUCCESS", response });
            } else {
                dispatch({ type: "FORGET_PASSWORD_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}

export const resetAdminPassword = (credentials, cb) => {
    console.log(credentials, cb)
    return (dispatch, getState) => {
        post(`/admin/reset-password`, credentials).then(response => {
            console.log("response", response)
            if (response.status === "success") {
                dispatch({ type: "FORGET_PASSWORD_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "FORGET_PASSWORD_SUCCESS", response });
            } else {
                dispatch({ type: "FORGET_PASSWORD_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}

export const createUsers = (credentials, cb) => {
    return (dispatch, getState) => {
        post('/user/register', credentials).then((response) => {
            console.log("Create user response ()=>", response);
            if (response.status === "Success") {
                dispatch({ type: "CREATE_USER_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "CREATE_USER_SUCCESS", response });

            } else {
                dispatch({ type: "CREATE_USER_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}


export const createAdmin = (credentials, cb) => {
    return (dispatch, getState) => {
        post('/user/register', credentials).then((response) => {
            console.log("Create user response ()=>", response);
            if (response.status === "Success") {
                dispatch({ type: "CREATE_USER_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "CREATE_USER_SUCCESS", response });

            } else {
                dispatch({ type: "CREATE_USER_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}


export const signOut = (credentials) => {
    return (dispatch, getState) => {
        localStorage.clear();
        dispatch({ type: "SIGNOUT_SUCCESS" })
        console.log("Admin logged out Successfully!");
    }
}

