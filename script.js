'use strict';

function getGitUserRepos(username){

  const url = `https://api.github.com/users/${username}/repos`;
  console.log(url);
  fetch(url)
  .then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
  })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function displayResults(responseJson) {
    console.log(responseJson);
     $('#results-list').empty();

    console.log(responseJson.length)
    console.log(responseJson[0].owner.login)
    console.log(responseJson[0].owner.avatar_url)
    let user = responseJson[0].owner.login 
    let avatar = responseJson[0].owner.avatar_url 
        
    $('#results-list').append(
       `<h3>User: <span class="user">${user}</span></h3>
        <h3>Avatar:<p><img class="avatar"src="${avatar}" alt="avatar url"></p>
        <h3><span class="user">Repos: ${responseJson.length}</span></h3>`)

    for (let i = 0; i < responseJson.length; i++) {
      $('#results-list').append(`
      <li>
      <h3>${responseJson[i].name}</h3>
      <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
      <p>${responseJson[i].description}</p>
      </li>`)
    };
    $('#results').removeClass('hidden')

}

function watchForm(){


  $('form').submit(event => {
    event.preventDefault();
    const username = $('#js-search-term').val();
    getGitUserRepos(username);
  });
}

$(watchForm);