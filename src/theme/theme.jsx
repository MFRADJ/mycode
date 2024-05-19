import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000', // Noir pour les éléments primaires comme les boutons d'accentuation
        },
        secondary: {
            main: '#ffffff', // Blanc pour les boutons secondaires
        },
        background: {
            default: '#f8f8f8', // Blanc cassé pour le fond de la `Navbar`
        },
        text: {
            primary: '#000000', // Noir pour le texte principal
        },
    },
    breakpoints: {
        values: {
            xs: 100,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f8f8f8', // Couleur de fond blanc cassé
                    color: '#000000', // Texte noir
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Texte des boutons sans majuscules
                },
                containedPrimary: {
                    backgroundColor: '#000000', // Fond noir pour les boutons primaires
                    color: '#ffffff', // Texte blanc
                },
                outlinedPrimary: {
                    borderColor: '#000000', // Bordure noire pour les boutons primaires
                    color: '#000000', // Texte noir
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#000000', // Icônes en noir
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff', // Fond blanc pour les champs de texte
                    borderRadius: '25px', // Bord arrondi
                    border: '1px solid #e0e0e0', // Bordure grise légère
                },
            },
        },
    },
});

export default theme;
