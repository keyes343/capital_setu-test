export const LocationPrompt = (callback?: (input: GeolocationPosition) => void) => {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            // console.log(position);
            if (callback) {
                return callback(position);
            }
        },
        function (error) {
            if (callback) {
                return callback;
            } else {
                console.error('Error Code = ' + error.code + ' - ' + error.message);
            }
        }
    );
};
