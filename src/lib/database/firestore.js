import { postElement } from '../view/templatePost.js';
import { currentUser } from '../auth/authetication.js'



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
            
            const containerOnePost = postElement(doc.id, doc.data());
            
            containerPosts.appendChild(containerOnePost);
            
            containerOnePost.lastElementChild.previousElementSibling.lastElementChild.addEventListener('click', likesCount)
            
            
        });
    });
}



// conteo de likes

const likesCount = (event) => {
    let saveId = event.srcElement.parentNode.parentNode.firstChild.nextElementSibling.id
    console.log(saveId)
    
    let user =  currentUser()
    console.log(user.uid)
    
    const ObjectData = {
        userid: user.uid,
        postid: saveId,
    }
    let typeChange = "decrement"
    firestoreLike(ObjectData, typeChange)
    
    
}

export const firestoreLike = (likesPost, typeLike) =>{
    
    
    const db = firebase.firestore();
    
    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    let value;
    
    if(typeLike == "increment"){
        value = increment
    }else{
        value = decrement
    }
    
    
    const storyRef = db.collection('post-like').doc(likesPost.postid);
    
    const userLike = db.collection('post-like').doc(likesPost.postid).collection('users').doc(likesPost.userid)
    
    const batch = db.batch();
    batch.set(storyRef, {}, {merge: true});
    batch.set(userLike, {}, {merge: true})
    batch.update(storyRef,{count: value});
    batch.update(userLike,{count: value});
    
    batch.commit();
    
    
}

//Eliminar post//
export const firestoreDelete = async (docId) => {
    await firebase.firestore().collection("posts").doc(docId).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}
