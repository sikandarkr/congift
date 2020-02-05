const ALPHABETS_REGEX = /^[a-zA-Z .?]*$/;
const NAME_REGEX = /^[A-Za-z. ]*$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{5,})/;
const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const NICKNAME_REGEX = /^.*(?=.*[a-zA-Z0-9]).*$/;

const NAME_VALIDATIONS = {
    required: true,
    pattern: {
        pattern: NAME_REGEX,
        message: 'No numbers/special characters allowed in name.'
    }, minlength: {
        requiredLength: 3
    }, maxlength: {
        requiredLength: 40
    }
};
const EMAIL_VALIDATIONS = {
    required: true,
    pattern: {
        pattern: EMAIL_REGEX,
        message: 'Please enter valid email address'
    }
};
const REQUIRED_VALIDATIONS = {
    required: true
};

const PHONE_VALIDATIONS = {
    required: true,
    pattern: {
        pattern: PHONE_REGEX,
        message: 'Please enter a valid phone number'
    }
};

const PASSWORD_VALIDATIONS = {
    required: true,
    minlength: {
        requiredLength: 5
    },
    pattern: {
        pattern: PASSWORD_REGEX,
        message: 'Password should contain at least one alphabet & one number'
    }
};

const NICKNAME_VALIDATIONS = {
    required: true,
    pattern: {
        pattern: NICKNAME_REGEX,
        message: 'Only special characters not allowed in nick name.'
    }, minlength: {
        requiredLength: 3
    }, maxlength: {
        requiredLength: 40
    }
};


export { NAME_VALIDATIONS, PASSWORD_VALIDATIONS, PHONE_VALIDATIONS, REQUIRED_VALIDATIONS, EMAIL_VALIDATIONS, NICKNAME_VALIDATIONS }
