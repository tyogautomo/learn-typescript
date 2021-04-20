var userInput; // unknown is different with any
var userName;
userInput = 4;
userInput = 'Tono';
// userName = userInput; // this will error if userInput type is 'unknown', but not with 'any'
// so do this instead
if (typeof userInput === 'string') {
    userName = userInput;
}
var informError = function (message, code) {
    throw { message: message, code: code };
};
informError('An Error occured!', 500);
