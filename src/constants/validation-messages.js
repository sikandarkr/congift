const errorMessages = {
    required: (param) => `${param.name ? param.name : 'This'} field is required`,
    pattern: (param) => param.message || `Incorrect format`,
    minlength: (param) => `Min ${param.requiredLength} characters is required`,
    maxlength: (param) => `Max chars allowed is ${param.requiredLength}`,
    compare: (param) => `Password & confirm password are not same`
};

export const getErrorMsg = (err, errObj) => {
    return errorMessages[err](errObj);
}