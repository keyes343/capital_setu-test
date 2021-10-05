import * as user from './T_User';
import * as box from './T_Box';

export { user, box };

export const hasKey = <O>(obj: O, key: keyof any): key is keyof O => {
    return key in obj;
};

export type Url_storage = {
    url: string;
    fileName: string;
    deleteKey: string;
    bucket: string;
    dateCreated: Date;
};

export type Quicklinks = 'About us' | 'Services' | 'Careers' | 'Contact';
export type Docref = 'user' | 'product' | 'job';
export type Menu = 'Home' | 'Chats' | 'Post Ads' | 'My Ads' | 'Profile';
