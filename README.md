# Github Repositories listing page

This is a simple web application that allows users to search for a GitHub username and view details about the user along with their repositories. The app leverages the GitHub REST API to fetch user information and repositories.

## Features

- **Search by Username:** Enter a GitHub username to view details about the user and their repositories.

- **Repositories per Page:** Choose the number of repositories to display per page.

- **Sorting and Searching:** Sort repositories by date and search for specific repositories by name.

## API Reference

- **GitHub REST API Documentation:** [GitHub REST API](https://docs.github.com/en/rest/reference)

## Live Demo

- **Live Demo:** [GitHub Repositories](https://github-repositories-listing-page-omega.vercel.app/)

## How to Use

1. Open `index.html` in a web browser.

2. Enter a GitHub username in the search bar and click the "Search" button.

3. View user details, repositories, and navigate through pagination.

4. Optionally, use the sorting and search features to customize your view.

## Technologies Used

- HTML
- CSS
- JavaScript

## Notes

- The application is built using vanilla HTML, CSS, and JavaScript.

- Pagination is server-side, with a default of 10 repositories per page and the option to choose up to 100 repositories per page.

- Loading indicators are displayed during API calls.

- Search bar functionality allows filtering repositories by name.

## Assumptions

- This app assumes that users are familiar with GitHub usernames and repositories.

- Edge cases, such as handling API errors, are considered in the code.

## Acknowledgments

- GitHub logo and other icons are provided by [Font Awesome](https://fontawesome.com/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
