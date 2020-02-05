
export const ADD_SENDER = 'ADD_SENDER';
export const CLEAR_SENDER = 'CLEAR_SENDER';


export const addSender = (sender) => ({
    type: ADD_SENDER,
    sender
});

export const clearSender = () => ({
    type: CLEAR_SENDER
});