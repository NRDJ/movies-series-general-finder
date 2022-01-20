var httpRequest = new XMLHttpRequest();
            
    httpRequest.onload = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);

            var movies = JSON.parse(httpRequest.responseText);

            movies.Search.forEach(function (item) {
                var htmlString = ""  

                for (var key in item) {
                    switch (key) {
                        case "imdbID":
                            htmlString += key + `: <a href="https://www.imdb.com/title/${item[key]}">link to imdb page</a><br/>`;
                            break;
                        case "Poster":
                            htmlString += key + `: <img id='poster' src='${item[key]}' alt='poster img'><br/>`;  
                            break;
                        default:
                            htmlString += key + `: ${item[key]}<br/>`;  
                    }
                }

                $('.row').append(`<div class="col"> <p>${htmlString}</p> </div>`);
            });
        
            } else {
            console.log(httpRequest.statusText);
            }
        }
    }

    httpRequest.onerror = function() {
        console.log(httpRequest.statusText);
    }

    var searchMovies = function () {  
        var input = document.querySelector('input').value;

        if (input) {
            httpRequest.open('GET', 'https://www.omdbapi.com/?s=' + input + '&plot=short&apikey=f9f6c2d');
            httpRequest.send();
        }
    }
      