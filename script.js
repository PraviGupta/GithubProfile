const apiUrl = 'https://api.github.com/users/'

const form = document.getElementById('form')
const main = document.getElementById('main')
const search = document.getElementById('search')

// getUser('PraviGupta')

async function getUser(username) {
    try {
        const { data } = await axios(apiUrl + username)

        createUserCard(data)
        getRepos(username)

    }
    catch (err) {
        if (err.response && err.response.status === 404) {

            createErrorCard('Username does not exist!')

        }

    }

}

async function getRepos(username) {
    try {
        const { data } = await axios(apiUrl + username + '/repos?sort=created')
        addReposToCard(data)
    } catch (err) {
        createErrorCard('Problem fetching repos')
    }
}

function createUserCard(user) {
    const cardHtml = `
    <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="user image" class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers}&ensp;
                    <strong>Followers</strong></li>
                    <li>${user.following}&ensp;
                    <strong>Following</strong></li>
                    <li>${user.public_repos}&ensp;
                    <strong>Repos</strong></li>
                </ul>
            </div>
            <div id="repos"></div>
        </div>
    `

    main.innerHTML = cardHtml //display user card
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 5) //get only first 5 repos
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}

function createErrorCard(msg) {
    const cardHtml = `
    <div class = "card">
    <h1>${msg}</h1>
    </div>
    `
    main.innerHTML = cardHtml //display error card
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value.trim() //trim white space

    if (user) {
        getUser(user)
        search.value = ''
    }
})

// const apiUrl = 'https://api.github.com/users/';

// const form = document.getElementById('form');
// const main = document.getElementById('main');
// const search = document.getElementById('search');

// async function getUser(username) {
//     try {
//         const { data } = await axios(apiUrl + username);

//         createUserCard(data);
//         getRepos(username);
//     } catch (err) {
//         if (err.response && err.response.status === 404) {
//             createErrorCard('Username does not exist!');
//         }
//     }
// }

// async function getRepos(username) {
//     try {
//         const { data } = await axios(apiUrl + username + '/repos?sort=created');
//         addReposToCard(data);
//     } catch (err) {
//         createErrorCard('Problem fetching repos');
//     }
// }

// function createUserCard(user) {
//     const cardHtml = `
//     <div class="card">
//         <div>
//             <img src="${user.avatar_url}" alt="user image" class="avatar">
//         </div>
//         <div class="user-info">
//             <h2>${user.name || user.login}</h2>
//             <p>${user.bio || 'No bio available'}</p>
//             <ul>
//                 <li>${user.followers}
//                 <strong> Followers</strong></li>
//                 <li>${user.following}
//                 <strong> Following</strong></li>
//                 <li>${user.public_repos}
//                 <strong> Repos</strong></li>
//             </ul>
//         </div>
//         <div id="repos"></div>
//     </div>
//     `;

//     main.innerHTML = cardHtml; // Display user card
// }

// function addReposToCard(repos) {
//     const reposEl = document.getElementById('repos');

//     repos
//         .slice(0, 5) // Get only the first 5 repos
//         .forEach(repo => {
//             const repoEl = document.createElement('a');
//             repoEl.classList.add('repo');
//             repoEl.href = repo.html_url;
//             repoEl.target = '_blank';
//             repoEl.innerText = repo.name;

//             reposEl.appendChild(repoEl); // Add repo to the card
//         });
// }

// function createErrorCard(msg) {
//     const cardHtml = `
//     <div class="card">
//         <h1>${msg}</h1>
//     </div>
//     `;

//     main.innerHTML = cardHtml; // Display error card
// }

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const user = search.value.trim(); // Trim whitespace

//     if (user) {
//         getUser(user);
//         search.value = '';
//     }
// });
