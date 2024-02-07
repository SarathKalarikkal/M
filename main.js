const movieInput = document.getElementById('movieInput');
const searchBtn = document.getElementById('searchBtn');
const movieBox = document.querySelector('.movie-box');


const fetchMovie = async (e) => {
  e.preventDefault();

  let movie = movieInput.value;

  //Omdb Api references
  let key = "53c800d";
  let url = `https://www.omdbapi.com/?t=${movie}&apikey=${key}`;


  movieBox.style.display ='block'


  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();

    movieBox.innerHTML = '';

///initial loader
    let loader = `<div class="loader">
      <div class="face">
          <div class="circle"></div>
      </div>
      <div class="face">
          <div class="circle"></div>
      </div>
    </div>`;

    movieBox.innerHTML = loader;

    //setting  a time for fetching
    setTimeout(() => {
      movieBox.innerHTML = '';
      movieHtmlCreator(data);
      movieInput.value = '';
    }, 1000);

  } catch (error) {
    console.log(error);
  }
};

const movieHtmlCreator = (data) => {
 
  if (data.Response !== 'True') {
    
    let errorMsg = `<div id="errorMsg">
      <h3>${data.Error}</h3>
      <p>(May be a spelling error)</p>
    </div>`;
    movieBox.innerHTML = errorMsg;
    return; 
  }

 
  let {
    Poster = '',
    Title = '',
    Director = '',
    Writer = '',
    Released = '',
    Runtime = '',
    imdbRating = '',
    Plot = '',
    Actors = '',
    Awards = '',
    Genre = ''
  } = data;

  // movieHtml using the destructured values
  let movieHtml = `<article class="movie-section">
    <div class="movie-header">
        <div class="poster">
            <img src="${Poster}" alt="">
        </div>
        <div class="movie-header-content">
          <h2>${Title}</h2>
          <ul class="year-time">
              <li>Year :<span>${Released}</span></li>
              <li>Time :<span>${Runtime}</span></li>
          </ul>
          <p id="genre">${Genre}</p>
          <div class="rating">
              <span class="material-symbols-outlined" id="star">star</span>
              <span>${imdbRating}</span>
          </div>
        </div>
    </div>
    <div class="movie-lower-content">
        <ul class="movie-builders">
            <li>Director :<span>${Director}</span></li>
            <li>Writer :<span>${Writer}</span></li>
            <li></li>
        </ul>
        <div class="plot">
            <h3>Plot</h3>
            <p>${Plot}</p>
        </div>
        <div class="cast">
            <h3>Cast</h3>
            <p>${Actors}</p>
        </div>
        <div class="awards">
            <h3>Awards</h3>
            <p>${Awards}</p>
        </div>
    </div>
  </article>`;

  // movieBox innerHTML with the created movieHtml
  movieBox.innerHTML = movieHtml;
};


searchBtn.addEventListener('click', fetchMovie);







