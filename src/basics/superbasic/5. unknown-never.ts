let userInput: unknown; // unknown is different with any
let userName: string;

userInput = 4;
userInput = 'Tono';

// userName = userInput; // this will error if userInput type is 'unknown', but not with 'any'

// so do this instead
if (typeof userInput === 'string') {
  userName = userInput;
}

const informError = (message: string, code: number): never => { // this will never return anything including 'undefined', because throwin an error
  throw { message, code };
};

informError('An Error occured!', 500);
