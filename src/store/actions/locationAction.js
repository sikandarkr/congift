import { storeData } from "../../core/storage-service";
import { setLoading } from "./commonActions";

const SET_LOCATION = 'SET_LOCATION';
const CLEAR_LOCATION = 'CLEAR_LOCATION';
const CHANGE_LOCATION = 'CLEAR_LOCATION';

const setLocation = (location) => ({
    type: SET_LOCATION,
    location
});

const changeLocation = (prev) => ({
    type: CHANGE_LOCATION,
    prev
});

const clearLocation = () => ({
    type: CLEAR_LOCATION
});

const storeLocation = (location) => {
    return dispatch => {
        dispatch(setLoading(true));
        storeData('location', location).then(
            data => {
                dispatch(setLoading(false));
                dispatch(setLocation(location));
            }
        ).catch(
            err => dispatch(setLoading(false))
        );
    }
}

export { SET_LOCATION, clearLocation, CLEAR_LOCATION, setLocation, storeLocation, changeLocation, CHANGE_LOCATION };