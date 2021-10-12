export const apis = {
    aws: 'https://2u0qh2doei.execute-api.ap-south-1.amazonaws.com/dev', // verified for capitalsetu
    // aws: 'http://localhost:5000',
    drive: 'https://drive.google.com/uc?export=view&id=',
};
// site name = http://capitalsetu.s3-website-us-east-1.amazonaws.com/#/

// const movie_api = 'afb8a329c7df90313dc254101c8b1823';
const site = 'https://api.themoviedb.org';
export const moviedb = {
    popular: site + '/3/discover/movie /?api_key=afb8a329c7df90313dc254101c8b1823&sory_by=popularity.desc',
    latest: site + `/3/discover/movie/?api_key=afb8a329c7df90313dc254101c8b1823&sort_by=primary_release_date.asc`,
    // popular: site + '/3/discover/movie/?api_key=afb8a329c7df90313dc254101c8b1823',
    // latest: site + `/3/discover/movie/?api_key=afb8a329c7df90313dc254101c8b1823`,
};

export const favs = (id: number) => `${site}/3/movie/${id}`;
