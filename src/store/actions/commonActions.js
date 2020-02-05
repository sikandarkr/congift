const SET_LOADING = 'SET_LOADING';
const SEARCH_VISIBLE = 'SEARCH_VISIBLE';
const SET_ANALYTICS = 'SET_ANALYTICS';

const setLoading = (status) => {
    return {
        type: SET_LOADING,
        status
    };
}

const setSearchVisibility = (status) => {
    return {
        type: SEARCH_VISIBLE,
        status
    };
}

const setAnalytics = (analytics) => {
    return {
        type: SET_ANALYTICS,
        analytics
    };
}

export { setLoading, SET_LOADING, setSearchVisibility, SEARCH_VISIBLE, setAnalytics, SET_ANALYTICS };