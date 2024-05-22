const initState = {
    status: null,
    projectMessage: null,
    projectData: null,
    categoryStatus: null,
    categoryProjectMessage: null,
    categoryProjectData: null
}

export const projectReducer = (state = initState, action) => {
    switch (action.type) {

        case "CREATE_CATEGORY_SUCCESS":
            return {
                ...state,
                projectData: action.response.data,
                projectMessage: action.response.message,
                status: action.response.status
            }
        case "CREATE_QUESTION_CATEGORY_SUCCESS":
            return {
                ...state,
                projectData: action.response.data,
                projectMessage: action.response.message,
                status: action.response.status
            }
        case "CREATE_NEWS_SUCCESS":
            return {
                ...state,
                projectData: action.response.data,
                projectMessage: action.response.message,
                status: action.response.status
            }
        case "CREATE_QUESTIONS_SUCCESS":
            return {
                ...state,
                projectData: action.response.data,
                projectMessage: action.response.message,
                status: action.response.status
            }
        case "CREATE_NEWS_ERROR":
            return {
                ...state,
                projectData: action.response.data,
                projectMessage: action.response.message,
                status: action.response.status
            }
        case "CREATE_QUESTIONS_ERROR":
            return {
                ...state,
                projectData: action.response.data,
                projectMessage: action.response.message,
                status: action.response.status 
            }
        case "CREATE_CATEGORY_ERROR":
            return {
                ...state,
                projectData: action.response.data,
                projectMessage: action.response.message,
                status: action.response.status
            }
        case "CREATE_CATEGORY_ERROR":
            return {
                ...state,
                projectData: action.response.data,
                projectMessage: action.response.message,
                status: action.response.status
            }

        case "FETCH_NEWS_RESPONSE":
            return {
                ...state,
                projectData: action.response.data,
                projectMessage: action.response.message,
                status: action.response.status
            }
        case "FETCH_QUESTIONS_RESPONSE":
            return {
                ...state,
                projectData: action.response.data,
                projectMessage: action.response.message,
                status: action.response.status
            }

        case "DELETE_CATEGORY_RESPONSE":
            return {
                ...state,
                projectData: action.response.data,
                categoryMessage: action.response.message,
                categoryStatus: action.response.status
            }
        case "DELETE_QUESTION_CATEGORY_RESPONSE":
            return {
                    ...state,
                    projectData: action.response.data,
                    categoryMessage: action.response.message,
                    categoryStatus: action.response.status
            }

        default:
            return state;
    }
}


export default projectReducer