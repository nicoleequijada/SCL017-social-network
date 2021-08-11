import { firestoreEdit } from "../../database/firestore.js";

export const editPostInput = (e) => {
  const posting = e.srcElement.closest('.post').querySelector(".content").innerHTML;
  const post = document.getElementById('post');
  post.value = posting;

  const postId = e.srcElement.closest('.post').querySelector(".post-head").id;
  const hiddenPostId = document.getElementById('postId');
  hiddenPostId.value = postId;
}

export const editPost = async () => {

  await firebase.auth().onAuthStateChanged(async (user) => {
    const content = document.getElementById('post').value;
    const docId = document.getElementById('postId').value;
    const postAEditar = {
      content: content,
      useruid: user.uid
    };

    await firestoreEdit(docId, postAEditar);
  });
};
