let topics;

const init = () => {
  topics = [];

  $('#tag-button').click(getTags);
};

const renderGif = src => {
  // create a column
  const col = $('<div>', { class: 'col-3' });

  // create the image
  const img = $('<img>', {
    class: 'm-auto p-2 img-thumbnail h-100 w-100',
    src: src
  });

  // append elements
  $('#images').append(col);
  col.append(img);
};

const getTags = () => {
  //   console.log('get tags called');
  let url =
    'http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=' +
    key +
    '&limit=5';

  $.ajax({ url, method: 'GET' }).then(res => {
    for (let i = 0; i < res.data.length; i++) {
      renderGif(res.data[i].images.downsized.url);
    }

    console.log('res :', res);
  });
};

window.onload = () => {
  init();
};
