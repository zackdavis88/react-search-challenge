# React Challenge

## Notes From the Developer

1. This app relies on any public JSON API that can return a response in the following format:

```
{
  "profiles": [{
    "photoUrl": STRING,
    "handle": STRING,
    "location": STRING,
    "age": NUMBER,
    "photoCount": NUMBER,
    "id": NUMBER
  }]
}
```

2. You can configure the API url that the application uses by modifying the **_apiconfig.json_** file found in the _src_ directory.

3. I used [JSONBIN.io](https://jsonbin.io/) to host the JSON API that returns profiles. I found that if you hit one of their free APIs with too many requests they
shut it down, so if the project is getting a bad response from the API then try updating apiconfig.json with one of these alternative URLS:

  * https://api.jsonbin.io/b/61735d7d9548541c29c735c4
  * https://api.jsonbin.io/b/61735d884a82881d6c64396b
  * https://api.jsonbin.io/b/61735da0aa02be1d445d7a99

4. Clicking the Match logo will send you to the homepage (SearchPage)


## Tasks

1. Modify the current app to replace the profiles pulled from the static JSON file with data pulled from a live api. This should be a public api.
1. Add a new page to the site for rendering the full profile. You should use react router and both the search profile page should be responsive.
1. Utilize a styled component framework to replace inline styles.
1. The search results should refetch every 10 seconds and the user should be presented a way to disable/enable this auto-refetch. There should be a visual timer that counts down to the next refresh.

Notes – we will be grading this for accuracy and error handling.

