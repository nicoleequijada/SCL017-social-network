import { postElement } from '../view/templatePost.js';


// guarda los datos
export const firestoreSave = (collectionName, data) => {
    firebase.firestore().collection(collectionName).add(data)
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

// leer y pintar los datos
export const firestoreRead = () => {
    const containerPosts = document.getElementById("container-posts");
    containerPosts.innerHTML = "";
    firebase.firestore().collection("posts").orderBy("timestamp", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            
            
            const containerOnePost = postElement(doc.data(), doc.id);
            
            containerPosts.appendChild(containerOnePost);
            
           containerOnePost.lastElementChild.previousElementSibling.lastElementChild.addEventListener('click', likesCount)
            
            
        });
    });
}

//Eliminar post//
export const firestoreDelete = async (docId) => {
    await firebase.firestore().collection("posts").doc(docId).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

// conteo de likes

const likesCount = (event)=>{
    let saveId = event.srcElement.parentNode.parentNode.firstChild.nextElementSibling.id
    console.log(saveId)
} 



