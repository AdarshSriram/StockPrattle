export interface Error {
  email: String,
  username: String,
  password: String,
  confirmPassword: String,
}

export const isEmail = (email: String) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

export const isEmpty = (string: string) => {
  if (string.trim() === '') return true;
  else return false;
};

export const validateSignupData = (data: NewUser) => {
  let errors = { email: "", username: "", password: "", confirmPassword: "" } as Error;

  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Passwords must match';
  if (isEmpty(data.username)) errors.username = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

export const validateLoginData = (data: LogInUser) => {
  let errors = { email: "", username: "", password: "", confirmPassword: "" } as Error;

  if (isEmpty(data.email)) errors.email = 'Must not be empty';
  if (isEmpty(data.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

export interface UserDetails {
  bio: String,
  job: String,
  website?: String | null
  location: String
}
export const reduceUserDetails = (data: UserDetails) => {
  let userDetails = { bio: "", job: "", location: "" } as UserDetails

  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  //if (!isEmpty(data.website.trim())) {
  // https://website.com
  // if (data.website.trim().substring(0, 4) !== 'http') {
  // userDetails.website = `http://${data.website.trim()}`;
  //} else userDetails.website = data.website;
  // }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};


interface NewUser {
  email: string,
  password: string,
  confirmPassword: string,
  username: string
}

interface LogInUser {
  email: string,
  password: string
}