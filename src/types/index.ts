import * as user from './T_User';
import * as box from './T_Box';

export { user, box };

export const hasKey = <O>(obj: O, key: keyof any): key is keyof O => {
    return key in obj;
};
