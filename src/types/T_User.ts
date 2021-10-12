export type User = {
    username: string;
    password: string;
    favs: string[];
};

export interface UserDocument extends User {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Card = {
    release_date: string;
    popularity: string;
    title: string;
    adult: boolean;
    id: number;
};
