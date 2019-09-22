let topics;

/**
 * function to render gif and ratings and append it to the HTML
 * and listen to clicks to play/stop the gifs
 * @param {string} id the id of the gif
 * @param {string} still the still link of the gif
 * @param {string} gif the moving link of the gif
 * @param {string} rating the rating of the gif
 */
const renderGif = (id, still, gif, rating, title, date) => {
  let counter = 0; // counter to keep track of gif state

  // create a column
  const col = $('<div>', { class: 'col-sm-12 col-md-4 col-lg-3' });

  // create the image
  const img = $('<img>', {
    class: 'img-thumbnail m-1 p-1',
    id: id,
    src: still
  });

  // create the rating
  const p = $('<p>', { class: 'blockquote pl-2' }).text(
    'Title: ' + title + ' | ' + 'Rating: ' + rating + ' | ' + 'Date: ' + date
  );

  // append elements
  $('#images').append(col);
  col.append(img, p);

  // listen for clicks
  $('#' + id).click(() => {
    // if you have not clicked the gif
    if (!counter) {
      $('#' + id).attr('src', gif);
      counter = 1;
    }
    // if you clicked the gif
    else {
      $('#' + id).attr('src', still);
      counter = 0;
    }
  });
};

/**
 * function that sends a GET request to the GIPHY API and
 * calls the renderGif function to load gifs onto the page
 * @param {string} str the text to search the api for
 */
const getTags = (str) => {
  // the url past to the request header
  let url =
    'http://api.giphy.com/v1/gifs/search?q=' +
    str.replace(/ /g, '+') +
    '&api_key=' +
    key +
    '&limit=10';

  // GET API request
  $.ajax({ url, method: 'GET' }).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      renderGif(
        res.data[i].id,
        res.data[i].images.downsized_still.url,
        res.data[i].images.downsized.url,
        res.data[i].rating,
        res.data[i].title,
        res.data[i].import_datetime
      );
    }
  });
};

/**
 * function to initialize variables
 */
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
    'brock'
  ];

  // loop through topics array and render gifs
  topics.forEach((element) => {
    getTags(element);
  });

  // adds more gifs to the page
  $('#tag-button').click(() => {
    const input = $('#tag-input').val();

    if (input === '') {
      alert('You must enter a tag first...');
    } else {
      getTags(input);
      $('#tag-input').val('');
    }
  });
};

/**
 *
 */
window.onload = () => {
  init();
};
