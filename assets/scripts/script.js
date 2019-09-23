let topics;

/**
 * function to render topic buttons
 * clicking on these buttons will call getTags passing in str
 * @param {string} str the name of the topic
 */
const renderTopics = str => {
  const strNoSpaces = str.replace(/ /g, '');
  const button = $('<button>', {
    type: 'button',
    class: 'btn btn-primary m-2',
    id: strNoSpaces
  }).text(str);

  $('#topics').append(button);

  $('#' + strNoSpaces).click(() => {
    getTags(str);
  });
};

/**
 * function to render gif and ratings and append it to the HTML
 * and listen to clicks to play/stop the gifs
 * @param {string} id the id of the gif
 * @param {string} still the still link of the gif
 * @param {string} gif the moving link of the gif
 * @param {string} rating the rating of the gif
 * @param {string} title the title of the gif
 */
const renderGif = (id, still, gif, rating, title) => {
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
  const pTitle = $('<p>', { class: 'blockquote pl-2' }).text(title);

  const pRating = $('<p>', { class: 'blockquote pl-2' }).text(
    'Rating: ' + rating.toUpperCase()
  );

  // append elements
  $('#images').append(col);
  col.append(img, pTitle, pRating);

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
const getTags = str => {
  // the url past to the request header
  let url =
    'http://api.giphy.com/v1/gifs/search?q=' +
    str.replace(/ /g, '+') +
    '&api_key=' +
    key +
    '&limit=10';

  // GET API request
  $.ajax({ url, method: 'GET' }).then(res => {
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
    'Animals',
    'Donald Trump',
    'People Laughing',
    'Anime Girls',
    'Horror Movies',
    'Family',
    'Chikorita',
    'Kojima',
    'Video Games',
    'Twerking'
  ];

  // loop through topics array and render gifs
  topics.forEach(element => {
    // getTags(element);
    renderTopics(element);
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
 * function executes immediately after a page has been loaded
 */
window.onload = () => {
  init();
};
