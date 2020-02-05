import { getErrorMsg } from '../constants/validation-messages';
// return true if validation succeeds;
const requiredValidator = (value) => {
    return value !== '';
}

const minLengthValidator = (value, minlength) => {
    if (!requiredValidator(value)) { return true; }
    return !(value.length < minlength);
}

const maxLengthValidator = (value, maxlength) => {
    if (!requiredValidator(value)) { return true; }
    return !(value.length > maxlength);
}

const patternValidator = (value, regex) => {
    if (!requiredValidator(value)) { return true; }
    return regex.test(value);
}

const compareValidator = (value1, value2) => {
    return value1 === value2;
}

const checkValidators = (value, err, errObj) => {
    switch (err) {
        case 'required':
            return requiredValidator(value, errObj);
        case 'minlength':
            return minLengthValidator(value, errObj.requiredLength);
        case 'maxlength':
            return maxLengthValidator(value, errObj.requiredLength);
        case 'pattern':
            return patternValidator(value, errObj.pattern)
        case 'compare':
            return compareValidator(value, errObj.value)
    }
}

export const checkAllValidationStatus = (validations = []) => {
    let errorCount = 0
    for (let v of validations) {
        errorCount += checkErrors(v.value, v.validators).length
    }
    if (errorCount <= 0) { return true; }
    return false;
}

export const checkErrors = (value, validators) => {
    const errors = Object.keys(validators);
    let errorsOccured = [];
    for (let err of errors) {
        if (!checkValidators(value, err, validators[err])) {
            errorsOccured.push(getErrorMsg(err, validators[err]));
        }
    }
    return errorsOccured;
}
