// Este es el punto de entrada de tu aplicacion
import { changeRoute, showTemplate } from './lib/router.js';
import { firebaseConfig } from './lib/config/configFirebase.js';

const init = () => {
    window.onload = () => {
        showTemplate(window.location.pathname);
    }

    window.onpopstate = () => {
        if (!window.location.hash.includes('#')) {
            showTemplate(window.location.pathname);
        }
    }  
    
    window.addEventListener('hashchange', () => {
        changeRoute(window.location.hash);
    });

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
};

init();
