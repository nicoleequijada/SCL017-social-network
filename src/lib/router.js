import { login } from './view/templateLogin.js';
import { register } from './view/templateRegister.js';
import { timeLine } from './view/templateTimeLine.js';
import { footer } from './view/templateFooter.js';
import { editPost, editPostInput } from './controllers/posts/edit.js'
import { firestoreRead, firestoreSave, firestoreDelete } from './database/firestore.js';
import {
  createUserWithPassword, signInWithPassword, signInWithGoogle, currentUser,
} from './auth/authetication.js';

export const showTemplate = async (hash) => {
  const containerRoot = document.getElementById('root');
  // Aquí se carga el footer una sola vez
  if (!document.getElementById('footer')) {
    containerRoot.parentNode.insertBefore(footer(), containerRoot.nextSibling);
  }
  switch (hash) {
    case '/':
    case '/login':
      containerRoot.classList.add('login');
      containerRoot.innerHTML = login().innerHTML;
      document.getElementById('login-form').addEventListener('submit', (event) => {
        event.preventDefault();
        // asignamos a variables los datos del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // aca validaremos los campos de entrada
        if (email.length === 0) {
          alert('Por favor ingrese su email');
        } else if ((password.length === 0)) {
          alert('Por favor ingrese su contraseña');
        } else {
          signInWithPassword(email, password).then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
              alert(`bienvenido ${user.displayName}`);
              window.location = '#/posting';
            } else {
              alert('debes verificar tu cuenta antes de continuar');
              firebase.auth().signOut();
            }
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`no se ha podido iniciar sesion error:${errorCode} ${errorMessage}`);
          });
        }
      });
      document.getElementById('iniciarConGoogle').addEventListener('click', () => {
        signInWithGoogle()    .then(() => {
          window.location = '#/posting';
        }).catch((err) => {
          console.log(err);
        });;
      });
      break;
    case '/register':
      containerRoot.innerHTML = register().innerHTML;
      const registerForm = document.getElementById('register-form');
      registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // asignamos a variables los datos del formulario
        const name = registerForm['name'].value;
        const email = registerForm['email'].value;
        const password = registerForm['password'].value;
        // aca validaremos los campos de entrada
        if (name.length === 0) {
          alert('Por favor ingrese su nombre');
        }
        if (email.length === 0) {
          alert('Por favor ingrese su email');
        } else if ((password.length === 0)) {
          alert('Por favor ingrese su contraseña');
        } else {
          createUserWithPassword(email, password, name);
        }
      });
      document.getElementById('registerWithGoogle').addEventListener('click', () => {
        signInWithGoogle();
      });
      break;
    case '/posting':
      containerRoot.classList.remove('login');
      // containerRoot.classList.add('posting');
      containerRoot.innerHTML = timeLine().innerHTML;
      // removemos la imagen del Storage
      localStorage.removeItem('imageUpload');
      // Aqui se agrega funcion para obtener imagen
      const uploadImage = document.getElementById('updload-image');
      uploadImage.addEventListener('change', function () {
        const archivo = new FileReader();
        if (this.files && this.files[0]) {
          archivo.onload = function (e) {
            // Aqui se realiza la previsualizacion de nuestra imagen
            const imagePreview = document.getElementById('imagenPrevisualizacion');
            imagePreview.style.width = '50%';
            // imagePreview.style.height = '100%';
            imagePreview.src = e.target.result;
            localStorage.setItem('imageUpload', e.target.result);
          };
        }
        archivo.readAsDataURL(this.files[0]);
      });

      await firestoreRead();

      const loQueDebeHacerElBotonDeEditar = (e) => {
        const botonDePublicar = document.getElementById('shared');
        botonDePublicar.style = 'display: none';

        const botonDeEditar = document.getElementById('shared2');
        botonDeEditar.style = 'display: block';


        editPostInput(e);
      }

      const timer = setInterval(() => {
        const botonesDeEditar = document.getElementsByClassName("editar");
        for (var i = 0; i < botonesDeEditar.length; i++) {
            botonesDeEditar[i].addEventListener('click', e => loQueDebeHacerElBotonDeEditar(e), false);
        }

        if (botonesDeEditar.length != 0) {
          clearInterval(timer);
        }
      }, 1000)

      break;
    case '/savePost':
      // Obtenemos desde el Storage del Navegador la variable imageUpload con la imagen cargada
      const imageUpload = localStorage.getItem('imageUpload');
      const userActive = currentUser();
      const validation = document.getElementById('post').value;
      if (validation.length === 0) {
        alert('ingresa un campo correcto');
      }
      let userImage;
      // conexion normal
      if (userActive.photoURL === undefined) {
        userImage = 'img/avatar.png';
        // conexion por google
      } else {
        userImage = userActive.photoURL;
      }
      const postData = {
        content: validation,
        email: userActive.email,
        useruid: userActive.uid,
        photo: userImage,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        displayname: userActive.displayName,
        countLikes: 0,
        photoUpload: imageUpload,
      };
      firestoreSave('posts', postData);
      window.history.replaceState({}, 'posting', '/posting');
      showTemplate('/posting');
      break;
    case '/editPost':
      await editPost();

      window.history.replaceState({}, 'posting', '/posting');
      showTemplate('/posting');
      break;
    default:
      break;
  }

  // Eliminar post //
  if (hash.startsWith('/deletePost')) {
    const docId = hash.replace('/deletePost/', '');
    await firestoreDelete(docId);
    window.history.replaceState({}, 'posting', '/posting');
    showTemplate('/posting');
  }
};
// cambiar la url para que no se vea el gatito
export const changeRoute = (hash) => {
  const hashCopy = hash.replace('#', '');
  window.history.replaceState({}, hashCopy.replace('/', ''), hashCopy);
  return showTemplate(hashCopy);
};
