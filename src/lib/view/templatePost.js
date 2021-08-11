export const postElement = (postId, postData, countLikes, dataLike) => {
  const posting = document.createElement('div');
  posting.classList.add('post');
  const postDate = new Date(postData.timestamp.seconds * 1000);
  const dateString = postDate.toLocaleDateString();
  const timeString = postDate.toLocaleTimeString();
  let className = '';
  console.log(dataLike);
  if (dataLike === true) {
    className = 'active';
  }
  // Creamos un DIV para mostrar si viene o no con imagen publicada
  const newDivWithImage = document.createElement('div');
  // Lo mostramos ocultado hasta saber si viene una imagen en el Post
  newDivWithImage.style.display = 'none';
  if (postData.photoUpload) {
    newDivWithImage.style.display = 'block';
    const newImageUpload = document.createElement('img');
    newImageUpload.classList.add('image-upload');
    newImageUpload.src = postData.photoUpload;
    newDivWithImage.appendChild(newImageUpload);
  }

  const newPosting = `
    <div class="post-head" id="${postId}">
      <img class="user-photo"src="${postData.photo}">
      <div class="name-posting">${postData.displayname} ha compartido: </div>
      <div class="icon-remove">
        <button class="icon-pencil editar"></button>
        <button class="icon-bin" onclick="window.location='#/deletePost/${postId}'"></button>
      </div>
    </div>
    <div class="date">
      ${dateString} ${timeString}
    </div>
    <div class="posting">
      <p class="content">${postData.content}</p>
      <br />
      ${newDivWithImage.innerHTML}
    </div>
    <hr>
    <div class="icons">
      <a class="icon-heart like ${className}">${countLikes}</a>
    </div>
    <hr>`;

  posting.innerHTML = newPosting;

  return posting;
};
