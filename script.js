let perPage = 10;
let currentPage = 1;
let totalPages = 0;
let repositories = []; // Global variable to store repositories
let sortByDate = false;

// Function to show loading
function showLoading() {
  document.getElementById("loading").style.display = "flex";
}

// Function to hide loading
function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

async function searchUser() {
  const username = document.getElementById("search-input").value;
  if (!username) {
    alert("Please enter a GitHub username");
    return;
  }

  try {
    showLoading(); // Show loading before making API calls
    const userDetails = await fetchUserDetails(username);
    repositories = await fetchRepositories(username, currentPage); // Set the global repositories variable
    totalPages = Math.ceil(userDetails.public_repos / perPage);
    renderUserDetails(userDetails);
    renderRepositories(repositories);
    renderPagination();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    hideLoading(); // Hide loading after API calls are completed
  }
}

function updatePerPage() {
  perPage = parseInt(document.getElementById("repo-count-select").value);
  searchUser();
}

async function fetchUserDetails(username) {
  const apiUrl = `https://api.github.com/users/${username}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("User not found");
  }

  return response.json();
}

async function fetchRepositories(username, page) {
  const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;
  const response = await fetch(apiUrl);
  return response.json();
}

function renderUserDetails(userDetails) {
  const userCard = document.getElementById("user-card");
  const userDetailsContainer = document.getElementById("user-details");

  userCard.innerHTML = `
        <h2>${userDetails.login}</h2>
        <img src="${userDetails.avatar_url}" alt="User Avatar" class="avatar">
        <p>${userDetails.bio || "No bio available"}</p>
        <div class="details">
            <i class="fas fa-map-marker-alt"></i>
            <p>${userDetails.location || "Location not available"}</p>
            </div>
            <div class="details">
            
            <i class="fas fa-twitter"></i>
        <p>${userDetails.twitter_username || "Twitter not available"}</p>
        </div>
        <div class="details">
            <i class="fab fa-github"></i>
            <p><a href="${
              userDetails.html_url
            }" target="_blank">GitHub Profile</a></p>
        </div>
        <p>Followers: ${userDetails.followers} | Following: ${
    userDetails.following
  }</p>
    `;

  userDetailsContainer.style.display = "block";
}

function renderRepositories(repositories) {
  const reposContainer = document.getElementById("repos-container");
  reposContainer.innerHTML = "";

  repositories.forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card";

    const detailsLink = document.createElement("div");
    detailsLink.className = "details-link";
    detailsLink.innerHTML = `<a href="${repo.html_url}" target="_blank"><i class="fas fa-link"></i> Details</a>`;

    repoCard.innerHTML = `
            <h2>${repo.name}</h2>
            <p>${repo.description || "No description available"}</p>
            <div class="details">
                <div class="languages">
                    <span style="background-color: #${getRandomColor()}">${
      repo.language
    }</span>
                </div>
                <div class="topics">
                    ${repo.topics
                      .map(
                        (topic) =>
                          `<span style="background-color: #${getRandomColor()}">${topic}</span>`
                      )
                      .join("")}
                </div>
            </div>
            <div class="details-link">
                <a href="${
                  repo.html_url
                }" target="_blank"><i class="fas fa-link"></i> Details</a>
            </div>
        `;

    reposContainer.appendChild(repoCard);
  });
}

function renderPagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("span");
    pageLink.className = "page-link";
    pageLink.textContent = i;
    pageLink.onclick = () => goToPage(i);

    paginationContainer.appendChild(pageLink);
  }
}

async function goToPage(page) {
  currentPage = page;
  const username = document.getElementById("search-input").value;
  const repositories = await fetchRepositories(username, currentPage);
  renderRepositories(repositories);
}

// Add this function to handle repository search
function searchByRepo() {
  const searchTerm = document
    .getElementById("search-repo-input")
    .value.toLowerCase();
  const filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm)
  );
  renderRepositories(filteredRepos);
}

// Add this function to toggle sorting by date
function toggleSortByDate() {
  sortByDate = !sortByDate;
  repositories.sort((a, b) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    return sortByDate ? dateB - dateA : dateA - dateB;
  });
  renderRepositories(repositories);
}

// Add this function to generate random color for topics and languages
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
