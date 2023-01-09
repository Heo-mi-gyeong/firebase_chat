import { atom } from 'recoil';

export const userData = atom({
    key: 'userData', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
  }); 