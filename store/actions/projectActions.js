import { get, post } from '../../../config/apiRequest'


export const createUpdates & trends = (credentials, cb) => {
    return (dispatch, getState) => {
        post(`/updates & trends`, credentials).then((response) => {
            console.log("Create updates & trends reponse ()=>", response);
            if (response.status === "Success") {
                dispatch({ type: "CREATE_Updates & trends_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "CREATE_Updates & trends_SUCCESS", response });
                localStorage.setItem('updates & trends', JSON.stringify(response.data));
            } else {
                dispatch({ type: "CREATE_Updates & trends_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}
export const createQuestions = (credentials, cb) => {
    return (dispatch, getState) => {
        post(`/questions`, credentials).then((response) => {
            console.log("Create questions reponse ()=>", response);
            if (response.status === "Success") {
                dispatch({ type: "CREATE_QUESTIONS_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "CREATE_QUESTIONS_SUCCESS", response });
                localStorage.setItem('question', JSON.stringify(response.data));
            } else {
                dispatch({ type: "CREATE_QUESTIONS_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}


export const getUpdates & trends = (cb) => {
    return (dispatch) => {
        get('/updates & trends').then(response => {
            console.log("MY new Updates & trends is here", response);
            if (response.statuscode === 200) {
                dispatch({ type: "FETCH_Updates & trends_RESPONSE", response });
                if (typeof cb === "function") cb({ type: "FETCH_Updates & trends_RESPONSE", response });
            } else {
                dispatch({ type: "FETCH_Updates & trends_RESPONSE", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}

export const getQuestions = (cb) => {
    return (dispatch) => {
        get('/questions').then(response => {
            console.log("MY new Questions is here", response);
            if (response.statuscode === 200) {
                dispatch({ type: "FETCH_QUESTIONS_RESPONSE", response });
                if (typeof cb === "function") cb({ type: "FETCH_QUESTIONS_RESPONSE", response });
            } else {
                dispatch({ type: "FETCH_QUESTIONS_RESPONSE", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}


export const createCategory = (credentials, cb) => {
    return (dispatch, getState) => {
        post(`/category`, credentials).then((response) => {
            console.log("Create category reponse ()=>", response);
            if (response.status === "Success") {
                dispatch({ type: "CREATE_CATEGORY_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "CREATE_CATEGORY_SUCCESS", response });
                localStorage.setItem('category', JSON.stringify(response.data));
            } else {
                dispatch({ type: "CREATE_CATEGORY_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}
export const createQuestionCategory = (credentials, cb) => {
    return (dispatch, getState) => {
        post(`/questionCategory`, credentials).then((response) => {
            console.log("Create category reponse ()=>", response);
            if (response.status === "Success") {
                dispatch({ type: "CREATE_QUESTION_CATEGORY_SUCCESS", response });
                if (typeof cb === "function") cb({ type: "CREATE_QUESTION_CATEGORY_SUCCESS", response });
                localStorage.setItem('category', JSON.stringify(response.data));
            } else {
                dispatch({ type: "CREATE_QUESTION_CATEGORY_ERROR", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}

export const deleteCategory = (id, cb) => {
    console.log("Inside id", id)
    return (dispatch, id) => {
        get(`/category/${id}`).then(response => {
            console.log("MY deleted category response is here", response);
            if (response.statuscode === 200) {
                dispatch({ type: "DELETE_CATEGORY_RESPONSE", response });
                if (typeof cb === "function") cb({ type: "DELETE_CATEGORY_RESPONSE", response });
            } else {
                dispatch({ type: "DELETE_CATEGORY_RESPONSE", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}

export const deleteQuestionCategory = (id, cb) => {
    console.log("Inside id", id)
    return (dispatch, id) => {
        get(`/questionCategory/${id}`).then(response => {
            console.log("MY deleted category response is here", response);
            if (response.statuscode === 200) {
                dispatch({ type: "DELETE_QUESTION_CATEGORY_RESPONSE", response });
                if (typeof cb === "function") cb({ type: "DELETE_QUESTION_CATEGORY_RESPONSE", response });
            } else {
                dispatch({ type: "DELETE_QUESTION_CATEGORY_RESPONSE", response });
                if (typeof cb === "function") cb();
            }
        })
    }
}
