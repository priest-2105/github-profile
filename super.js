const APIURL = "https://api.github.com/users/";


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


getUser('priest-2105')

async function getUser(username){

    try {
        // Make a request to the GitHub API
        const resp = await fetch(APIURL + username);
        
        // Check if the response status is 404 (Not Found)
        if (resp.status === 404) {
            // If the user is not found, throw an error
            throw new Error('User not found');
        }

        // If the user is found, parse the response data
        const respData = await resp.json();
        
        // Create the user card with the fetched data
        createUserCard(respData);
        
        // Fetch and display the user's repositories
        getRepos(username);
    } catch (error) {
      
        // Display an error message if the user is not found
        main.innerHTML = `<p style="color: red; font-weight: bold;">${error.message}</p>`;
    }
}

async function getRepos(username){

    const resp = await fetch(APIURL + username + '/repos')
    const respData = await resp.json();


    addReposTocard(respData);

}


function createUserCard (user){

    const cardHTML = `
    <div class="card">
    <div>
     <img class="avatar" src="${user.avatar_url}" alt=${user.name}>
     </div>

     <div class="user-info">

     <h2>${user.name}</h2>
     <p>${user.bio}</p>

     <ul class="info">
     <li> ${user.followers} <strong>Followers </strong></li>
     <li>${user.following} <strong>Following </strong> </li>
     <li> ${user.public_repos} <strong>Repos </strong></li> 
     </ul>


    <h4> Repos <h4>
     <div id="repos">    </div>

     </div>
     </div>
     `;
 
     main.innerHTML = cardHTML;

}

function addReposTocard(repos){

    const reposEl = document.getElementById('repos');

    repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 10)
    .forEach((repo) => {
        const repoEl = document.createElement('a');

        repoEl.classList.add('repo');

        repoEl.href = repo.html_url;
        repoEl.innerText = repo.name;
        repoEl.target = "_blank";

        reposEl.appendChild(repoEl);
    });

}

form.addEventListener('submit', (e) => {

    e.preventDefault();


    const user = search.value;

    if (user){
        getUser(user);

        search.value = '';
    }else{
     const message = document.createElement('div')
     message.innerHTML = 'Enter Valid UserName';


     main.appendChild(message);

    }




})