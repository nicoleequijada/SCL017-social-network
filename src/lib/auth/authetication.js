import { urlSite } from '../config/globalSettings.js';

export const createUserWithPassword = (email, password, names) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.updateProfile({
        displayName: names,
      });
      const actionCodeSettings = {
        url: urlSite,
      };
      user.sendEmailVerification(actionCodeSettings)
        .then(() => {
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(`Se produjo un error al verificar email. Error: ${errorMessage} ${errorCode}`);
        });
      // una vez creada la cuenta con el signOut se cierra la sesion y hay que iniciar
      // con email y clave
      firebase.auth().signOut();
      alert('la cuenta fue creada, verifica el correo que te hemos enviado');
      // aqui redirecciono a pagina login
      window.location = '#/login';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Se produjo un error al crear cuenta. Error: ${errorMessage} ${errorCode}`);
    });
};
export async function signInWithPassword(email, password) {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};
export async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return await firebase.auth().signInWithPopup(provider)

};

export const currentUser = () => {
  const user = firebase.auth().currentUser;
  return user;
};
