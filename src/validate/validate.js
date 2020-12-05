const joi = require('@hapi/joi');
const constant = require('../config/constant');

const validate = {
    signup: (body) => {
        const schema = joi.object().keys({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required().trim(),
            password: joi.string().required().regex(constant.regEx.passwordRegEx),
            // countryCode: joi.string().required(),
            // mobileNumber: joi.string().required(),
            name: joi.string().required(),
            role: joi.number().required(),
            // isManager: joi.required(),
            // recaptchaReactive: joi.string()
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    guestSignup: (body) => {
        const schema = joi.object().keys({
            email: joi.string().email().required().trim(),
            mobileNumber: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateOtpProcess: (body) => {
        const schema = joi.object().keys({
            email: joi.string().email().required().trim(),
            mobileNumber: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    createUser: (body) => {
        const schema = joi.object().keys({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required().trim(),
            password: joi.string().required().regex(constant.regEx.passwordRegEx),
            countryCode: joi.string().required(),
            mobileNumber: joi.string().required(),
            role: joi.string().required(),
            isManager: joi.required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    createManager: (body) => {
        const schema = joi.object().keys({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required().trim(),
            password: joi.string().required().regex(constant.regEx.passwordRegEx),
            countryCode: joi.string().required(),
            mobileNumber: joi.string().required(),
            role: joi.string().required(),
            isManager: joi.required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    verify: (body) => {
        const schema = joi.object().keys({
            jpn: joi.string().required(),
            etl: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    signIn: (body) => {
        const schema = joi.object().keys({
            email: joi.string().email().required().trim(),
            password: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    forgotPassword: (body) => {
        const schema = joi.object().keys({
            email: joi.string().email().required().trim()
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    setPassword: (body) => {
        const schema = joi.object().keys({
            jpn: joi.string().required(),
            etl: joi.string().required(),
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    postSetPassword: (body) => {
        const schema = joi.object().keys({
            email: joi.string().required(),
            password: joi.string().required().regex(constant.regEx.passwordRegEx),
            role: joi.number(),
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    changePassword: (body) => {
        const schema = joi.object().keys({
            currentPassword: joi.string().required(),
            newPassword: joi.string().required().regex(constant.regEx.passwordRegEx),
            confirmNewPassword: joi.string().required().regex(constant.regEx.passwordRegEx),
            id: joi.number(),
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateId: (body) => {
        const schema = joi.object().keys({
            id: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateParkingLot: (body) => {
        const schema = joi.object().keys({
            manager: joi.string(),
            parkingLotName: joi.string().required(),
            latitude: joi.required(),
            longitude: joi.required(),
            address: joi.string().required(),
            // zone: joi.string().required(),
            totalSpaces: joi.string().required(),
            parkingFee: joi.number().required(),
            convenienceFee: joi.number().required(),
            maxHours: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateLatitudeLongitude: (body) => {
        const schema = joi.object().keys({
            page: joi.string().required(),
            perPage: joi.string().required(),
            latitude: joi.string().required(),
            longitude: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateTaxRates: (body) => {
        const schema = joi.object().keys({
            _id: joi.string().required(),
            stateColorado: joi.number().required(),
            countryEagle: joi.number().required(),
            cityAvon: joi.number().required(),
            specialDistrict: joi.number().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateCategories: (body) => {
        const schema = joi.object().keys({
            name: joi.string().required(),
            id: joi.number(),
            status: joi.boolean()
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateSubCategories: (body) => {
        const schema = joi.object().keys({
            name: joi.string().required(),
            categoriesID: joi.number().required(),
            id: joi.number(),
            status: joi.boolean()
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateMinorCategories: (body) => {
        const schema = joi.object().keys({
            name: joi.string().required(),
            subCategoriesID: joi.string().required(),
            id: joi.number(),
            status: joi.boolean()
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateFilterCategories: (body) => {
        const schema = joi.object().keys({
            name: joi.string().required()
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateProducts: (body) => {
        const schema = joi.object().keys({
            name: joi.string().required(),
            id: joi.number(),
            description: joi.string().required(),
            price: joi.number(),
            image: joi.string(),
            imageKey: joi.string(),
            // categorisID: joi.string(),
            // subCategorisID: joi.string(),
            // minorCategorisID: joi.string(),
            // offerID: joi.string(),
            lumen: joi.string(),
            watt: joi.string(),
            kilowatt_hour: joi.string(),
            gigahertz: joi.string(),
            liter: joi.string(),
            gallon: joi.string(),
            volt: joi.string(),
            ampere: joi.string(),
            ampere_hour: joi.string(),
            gallons_per_minute: joi.string(),
            british_thermal_unit: joi.string(),
            r_value: joi.string(),
            width: joi.string(),
            height: joi.string(),
            depth: joi.string(),
            createdBy: joi.string(),
            isDeleted: joi.number(),
            isActivated: joi.boolean(),
            createdDate: joi.string(),
            updatedDate: joi.string(),
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateOffer: (body) => {
        const schema = joi.object().keys({
            offer_url: joi.string().required(),
            seller_name: joi.string().required(),
            product_price: joi.number(),
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateQuestions: (body) => {
        const schema = joi.object().keys({
            question_name: joi.string().required(),
            id: joi.number(),
            isActivated: joi.boolean(),
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateAnswers: (body) => {
        const schema = joi.object().keys({
            answer_name: joi.string().required(),
            question_id: joi.number(),
            id: joi.number(),
            isActivated: joi.boolean(),
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateFlow: (body) => {
        const schema = joi.object().keys({
            flow_name: joi.string().required(),
            flow_questions: joi.string(),
            image: joi.string(),
            imageKey: joi.string(),
            id: joi.number(),
            isActivated: joi.boolean(),
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    validateFlowBuilder: (body) => {
        const schema = joi.object().keys({
            flow_id: joi.number().required(),
            flow_questions: joi.number(),
            flow_Question_answers: joi.string(),
            id: joi.number(),
            category: joi.string(),
            type: joi.string(),
            // subCategorisID: joi.string(),
            // minorCategorisID: joi.string(),
            isActivated: joi.boolean(),
        });
        const { value, error } = schema.validate(body, { abortEarly: false });
        if (error && error.details) {
            return { error };
        }
        else {
            return { value };
        }
    },

    email: function (value) {
      let error = "";
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!value || value == "undefined") {
        error = "emailBlank";
      } else if (!re.test(value.trim())) {
        error = "emailNotValid";
      }
      return error;
    },
  
    password: function (value) {
      let error = "";
      if (!value || value == "undefined") {
        error = "passwordBlank";
      }
      return error;
    },
  
    firstname: function (value) {
      let error = "";
      const re = /^[a-zA-Z]{2,30}$/;
      if (!value || value == "undefined") {
        error = "Firstname required.";
      } else if (!re.test(value.trim())) {
        error = "Firstname invalid.";
      }
      return error;
    },
  
    lastname: function (value) {
      let error = "";
      const re = /^[a-zA-Z ]{2,30}$/;
      if (!value || value == "undefined") {
        error = "Lastname required.";
      } else if (!re.test(value.trim())) {
        error = "Lastname invalid.";
      }
      return error;
    },
  
    username: function(value) {
      let error = '';
      const re = /^[a-zA-Z0-9]{3,15}$/;
      if (!value || value == 'undefined') {
        error = 'Username required.';
      } else if (!re.test(value.trim())) {
        error = 'Username invalid.';
      }
      return error;
    },
  
    phone: function(value) {
      let error = '';
      const re = /^\d*$/;
      if (!value || value == 'undefined') {
        error = 'Phone required.';
      } else if (!re.test(value)) {
        error = 'Phone invalid.';
      }
      return error;
    }

}

module.exports = validate;
