import 'styled-components';
interface IPalette {
    main: string;
    contrastText: string;
}
declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: {
            small: string;
            medium: string;
            large: string;
        };
        palette: {
            common: {
                black: string;
                white: string;
            };
            primary: IPalette;
            secondary: IPalette;
        };
        padding: {
            small: string;
            medium: string;
            large: string;
        };
        colors: {
            blue: string;
            yellow: string;
            maroon: string;
            orange: string;
            yellow: string;
            darkpink: string;
        };
    }
}
