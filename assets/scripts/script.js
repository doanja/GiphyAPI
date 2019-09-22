let topics;

const renderGif = (gifId, stillSrc, gifSrc) => {
  let counter = 0; // counter to keep track of gif state

  // create a column
  const col = $('<div>', { class: 'col-sm-12 col-md-4 col-lg-3' });

  // create the image
  const img = $('<img>', {
    class: 'm-1 p-1 img-thumbnail',
    id: gifId,
    src: stillSrc
  });

  // append elements
  $('#images').append(col);
  col.append(img);

  $('#' + gifId).click(() => {
    if (!counter) {
      $('#' + gifId).attr('src', gifSrc);
      counter = 1;
    } else {
      $('#' + gifId).attr('src', stillSrc);
      counter = 0;
    }
  });
};

const getTags = (str) => {
  let url =
    'http://api.giphy.com/v1/gifs/search?q=' +
    str.replace(/ /g, '+') +
    '&api_key=' +
    key +
    '&limit=10';

  $.ajax({ url, method: 'GET' }).then((res) => {
    console.log('res :', res);
    for (let i = 0; i < res.data.length; i++) {
      renderGif(
        res.data[i].id,
        res.data[i].images.downsized_still.url,
        res.data[i].images.downsized.url
      );
    }
  });
};

const init = () => {
  topics = [
    'chikorita',
    'magikarp',
    'bulbasaur',
    'psyduck',
    'caterpie',
    'charmander',
    'pikachu',
    'squirtle',
    'pigey',
    'xatu'
  ];

  // $('#tag-button').click(() => {
  //   getTags();
  // });
};

window.onload = () => {
  init();
  topics.forEach((element) => {
    getTags(element);
  });
};
