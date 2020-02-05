import { AsyncStorage } from "react-native";

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        return new Promise.reject();
    }
}

const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return new Promise.resolve(JSON.parse(value));
        }
        throw 'no data';

    } catch (error) {
        return new Promise.reject();
    }
}

const removeByKey = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        return new Promise.reject();
    }
}

const removeAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        return new Promise.reject();
    }
}

export { storeData, retrieveData, removeByKey, removeAll };