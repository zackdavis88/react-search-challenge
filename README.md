# React Challenge

## Notes From the Developer

1. This app uses [PokeAPI](https://pokeapi.co/) to retrieve all data.

2. Sorting has limitations: You can alphabetically sort a page's results but the PokeAPI does not appear to have sorting
   enabled for their API that returns a paginated list of pokemon, according to the documentation.
   So we can only sort at a page-level not API-level.

3. Clicking the Pokedex logo will send you to the homepage (SearchPage)


## Tasks

1. Modify the current app to replace the profiles pulled from the static JSON file with data pulled from a live api. This should be a public api.
1. Add a new page to the site for rendering the full profile. You should use react router and both the search profile page should be responsive.
1. Utilize a styled component framework to replace inline styles.
1. The search results should refetch every 10 seconds and the user should be presented a way to disable/enable this auto-refetch. There should be a visual timer that counts down to the next refresh.

Notes – we will be grading this for accuracy and error handling.

