// The code below ensures that students who are using CodeGrade will get credit
// for the code-along in Canvas; you can disregard it.

require("./helpers.js");

describe("", () => {
  describe("", () => {
    it("Test passing", () => {
      return true;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("github-form");
  const searchInput = document.getElementById("search");
  const userList = document.getElementById("user-list");
  const reposList = document.getElementById("repos-list");

  form.addEventListener('submit', function (event){
    event.preventDefault();
    let searchValue = searchInput.value;
    if (searchValue) {
      searchUsers(searchValue);
    }
  });

  function searchUsers(query) {
    fetch('https://api.github.com/search/users?q=' + query)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayUsers(data.items);
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }


  function displayUsers(users) {
    userList.innerHTML = '';
    reposList.innerHTML = '';
    users.forEach(user => {
      let userItem = document.createElement('li');
      userItem.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
      `;
      userItem.addEventListener('click', () => fetchUserRepos(user.login));
      userList.appendChild(userItem);
    });
  }

  function fetchUserRepos(username) {
    fetch('https://api.github.com/users/' + username + '/repos')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayRepos(data);
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }

  function displayRepos(repos) {
    reposList.innerHTML = '';
    repos.forEach(repo => {
      let repoItem = document.createElement('li');
      repoItem.textContent = repo.name;
      reposList.appendChild(repoItem);
    });
  }
})
