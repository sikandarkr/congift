import { setLoading } from "./commonActions";
import { storeData, removeByKey } from "../../core/storage-service";

export const SIGN_IN = 'SIGN_IN';
export const STORE_USER = 'STORE_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const storeUser = (user) => ({
    type: STORE_USER,
    user
});


export const signIn = (user) => {
    return dispatch => {
        dispatch(setLoading(true));
        storeData('user', user).then(
            data => {
                dispatch(setLoading(false));
                dispatch(storeUser(user));
            }
        ).catch(
            err => dispatch(setLoading(false))
        );
    }
}

export const signOut = () => {
    return dispatch => {
        removeByKey('user');
        dispatch(logOut());
    }
}

export const logOut = () => ({
    type: REMOVE_USER
})