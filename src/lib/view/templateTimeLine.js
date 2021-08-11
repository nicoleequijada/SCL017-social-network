export const timeLine = () => {
  const posting = document.createElement('div');

  const viewPosting = `
  <div class="time-line">
    <div class="banner-left">
      <a class="icon-newspaper" href="">Muro</a>
      <a class="icon-user" href="">Perfil</a>
      <a class="icon-exit" href="/">Cerrar sesión</a>
  </div>
    <div class="shared-today">
      <input id="post" class="post-timeline" type="text" placeholder="Que te gustaria compartir hoy?">
      <label for="updload-image" class="custom-file-upload">
        <i class="icon-camera"></i>
      </label>
      <input id="updload-image" type="file" accept="image/*" style="margin-top: 30px">
      <img id="imagenPrevisualizacion">
      <input type="hidden" name="postId" id="postId" value=""/>
      <button id="shared" class="shared" onclick="window.location='#/savePost'">Publicar</button>
      <button id="shared2" class="shared2" onclick="window.location='#/editPost'">Editar</button>
      <div id="container-posts"></div>
    </div>

    <div class="banner-right">
      <h2>Intereses</h2>
      <a href="https://www.expreso.info/destinos/edicion_limitada/27350_los_mejores_100_consejos_de_viajes_que_te_han_dado_nunca">Tips de viaje</a>
      <a href="https://www.gochile.cl/es/destinos.htm">Destinos turisticos</a>
      <a href="https://rutas.detrekking.cl/">Trekking</a>
      <a href="https://laderasur.com/destino/10-senderos-faciles-para-recorrer-en-santiago/">Senderismo</a>
      <a href="https://www.aprendizajeviajero.com/donde-comer-santiago-chile/">¿Donde comer en santiago?</a>

    </div>
  </div>
  `;

  posting.innerHTML = viewPosting;
  return posting;
};
