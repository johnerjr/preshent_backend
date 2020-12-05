let constant = {
  secretKeys: {
    cryptrSecretKey: 'preshent@534fsdfg'
  },
  HttpStatus: {
    processing: 102,
    success: 200, // Go to success
    created: 201, // Go to success
    accepted: 202, // Go to success
    nonAuthInfo: 203, // Go to success
    noContent: 204, // Give data null and go to success
    found: 302,
    badRequest: 400,
    unauthorized: 401,
    subscriptionRequired: 402,
    forbidden: 403,
    notFound: 404,
    methodNotAllowed: 405,
    notAcceptable: 406,
    conflict: 409,
    noDataFound: 410,
    unProcessable: 422,
    internalServerError: 500,
    networkConnectTimeout: 599
  },
  httpCode: {
    processing: 102,
    success: 200, // Go to success
    created: 201, // Go to success
    accepted: 202, // Go to success
    nonAuthInfo: 203, // Go to success
    noContent: 204, // Give data null and go to success
    found: 302,
    badRequest: 400,
    unauthorized: 401,
    subscriptionRequired: 402,
    forbidden: 403,
    notFound: 404,
    methodNotAllowed: 405,
    notAcceptable: 406,
    conflict: 409,
    noDataFound: 410,
    unProcessable: 422,
    internalServerError: 500,
    networkConnectTimeout: 599,
  },
  message: {
    emailAllreadyExist: 'This email already exists in our system. Please try a different one',
    validationError: 'Validation error, try again',
    accessDenied: 'Access denied, no token found',
    accountCreated: 'Your account has been created successfully',
    userAccountCreated: 'Account created, please enter OTP sent in mobile and email',
    userAccountCreatedByAdmin: 'Account created, details are sent to user via email',
    emailAlreadyExist: 'This email is taken, try another',
    mobileNumberAlreadyExist: 'This mobile number is taken, try another',
    emailAndMobileNumberAlreadyExist: 'This email & mobile number are taken, try another',
    invalidInputs: 'Email/Password is incorrect',
    userFound: 'User found',
    userNotFound: 'User not found',
    userUpdated: 'User updated successfully',
    userDeleted: 'User deleted successfully',
    hostUpdated: 'Host updated successfully',
    hostDeleted: 'Host deleted successfully',
    contactUsMessageDeleted: 'Contact message deleted successfully',
    contactUsMessageNotFound: 'Contact message not found',
    errorCreatingAdmin: 'Error in creating admin profile',
    errorCreatingUser: 'Error in creating user profile',
    parkingSpaceCreated: 'New location created successfully',
    parkingSpaceUpdated: 'Location updated successfully',
    errorCreatingParkingSpace: 'Error in creating new location',
    profileFound: 'Profile found',
    profileNotFound: 'Profile not found',
    serverError: 'Something went wrong, try after sometime',
    errorSendingEmail: 'Error in sending email, try again',
    resetPasswordNow: 'Check your email and reset your password now',
    sessionTimeout: 'Session timeout',
    signInSuccess: 'Sign-in successfully',
    accountNotActive: 'Account not active, please contact admin',
    setPasswordNow: 'Set password now',
    unauthorized: 'Unauthorized access',
    errorCreatingPassword: 'Error in creating password',
    passwordChangedSuccessfully: 'Password changed successfully',
    errorInPasswordChange: 'Invalid current password, try again',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    mobileNumberRequired: 'Mobile number is required',
    usersFound: 'Users list found',
    usersNotFound: 'Users list not found',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'last name is required',
    addressRequired: 'Address is required',
    cityRequired: 'City name is required',
    stateRequired: 'State is required',
    allMandatoryFieldRequired: 'All mandatory fields are required',

    dataFound: 'Data found',
    dataNotFound: 'Data not found',

    spotsNotFound: 'No results found within 50 miles',

    errorCreatingTransaction: 'Error in transaction',
    transactionCreated: 'Your booking is confirmed',
    bookingNotAvailable: 'Booking not available, spaces full',

    accountNotVerified: 'Account not verified, click on link sent in email to verify your account',
    accountVerified: 'Account verified, now you can login to your account',

    taxRateUpdated: 'Tax rates updated successfully',
    taxRateNotUpdated: 'Error in tax rates update',

    userAlreadyExist: 'Email already verified, just signin directly',
    enterOtpNow: 'Enter OTP now',
    errorOccur: 'Error occur, try again',

    invalidOtp: 'OTP does not match, try again',
    setupPasswordNow: 'Setup password now',

    errorSendingContactUsForm: 'Error sending your message, try again',
    contactUsFormSent: 'Your message is received successfully',
    accountSwitchedToHost: 'You have created a Host Account',
    errorSwitchingAccountToHost: 'Error creating account to Host, try again',
    linkExpired: 'Link expired',

    moneyAddedToWallet: 'Money added to wallet successsfully',
    errorAddingMoneyToWallet: 'Error adding money to wallet',

    cardRemoved: 'Card removed successfully',
    errorRemovingSavedCard: 'Error removing card, try later',

    cardSetDefault: 'Card set to Default successfully',
    errorSettingCardAsDefault: 'Error Setting Card as Default, try again',

    braintreeCustomerFound: 'Braintree customer found',
    braintreeCustomerNotFound: 'Braintree customer not found',

    braintreePlansFound: 'Braintree plans found',
    braintreePlansNotFound: 'Braintree plans not found',

    createTokenForQuickBooks: 'Create new Token for Quickbooks API hit',
    quickBooksTokenSaved: 'Quickbooks token saved successfully',
    errorSavingQuickBooksToken: 'Error saving quickbooks token',
    errorFindingQuickBooksTokenFromDatabase: 'Error finding Quickbooks token from database',

    selectCetegories : 'Get all categories successfully',
    insertCetegories : 'Category Created!',
    updateCetegories : 'Category Updated!',

    selectSubCetegories : 'Get all sub-categories successfully',
    insertSubCetegories : 'Sub-Category Created!',
    updateSubCetegories : 'Sub-Category Updated!',

    selectMinorCetegories : 'Get all minor-categories successfully',
    insertMinorCetegories : 'Minor-Category Created!',
    updateMinorCetegories : 'Minor-Category Updated!',

    selectProducts : 'Get all Products successfully',
    insertProducts : 'Product Created!',
    updateProducts : 'Product Updated!',
    getselectProducts : 'Get Selected Products successfully',


    selectOffer : 'Get all Offer successfully',
    insertOffer : 'Offer Created!',
    updateOffer : 'Offer Updated!',

    selectQuestions : 'Get all Questions successfully',
    insertQuestion : 'Question Created!',
    updateQuestion : 'Question Updated!',

    selectAnswers : 'Get all Answers successfully',
    insertAnswer : 'Answer Created!',
    updateAnswer : 'Answer Updated!',

    selectFlows : 'Get all Flows successfully',
    insertFlow : 'Flow Created!',
    updateFlow : 'Flow Updated!',

    selectFlowBuilders : 'Get all Flows successfully',
    insertFlowBuilder : 'Flow Builder Created!',
    updateFlowBuilder : 'Flow Builder Updated!',


    
  },

  regEx: {
    // passwordRegEx: '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}'
    // passwordRegEx: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
    passwordRegEx: /^.{7,}$/,
  },

  function: {
    generateActivationNumber: () => {
      return Math.floor(1000 + Math.random() * 9000); // Generates 4 digits number only
      // return Math.floor((Math.random() * 574119) + 54);
    },

    validationError: (res, errorArray) => {
      return res.status(constant.httpCode.success).json({
        success: false,
        statusCode: constant.httpCode.badRequest,
        message: constant.message.validationError,
        data: errorArray
      });
    },

  },

  emailSubject: {
    signup: 'Preshent account created successfully',
    resetPassword: 'Preshent password help',
    accountCreated: 'Preshent account created',
    otpHelp: 'Preshent OTP help',
  },


};

module.exports = constant;