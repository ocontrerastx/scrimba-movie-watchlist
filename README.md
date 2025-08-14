# Movie Search & Watchlist Application

This project involved creating a movie search and watchlist management application using the OMDB API based on the design provided in the following Figma file:

[Figma Design](https://www.figma.com/design/jhFRdFIdHpRxsDznNXtpXw/Movie-Watchlist?node-id=2-17&t=0vUIyfOJRiF4hFjU-1)

Users can search for movies, view detailed information, and maintain a persistent watchlist that survives browser sessions. The primary goal was to build a functional application that demonstrates API integration, data persistence, and dynamic UI updates.

**Key Concepts Applied:**

- **Fetch API:** This project introduced the use of the Fetch API for making HTTP requests to external services. The OMDB API was integrated to retrieve movie metadata, including titles, release dates, ratings, and poster images.

- **Local Storage:** Implemented browser local storage to persist the user's watchlist across sessions. This involved serializing and deserializing JavaScript objects to maintain state without requiring a backend database.

- **Array Methods for Data Management:** Extensively used modern JavaScript array methods to manage the watchlist functionality:

  - `.find()` and `.filter()` for searching through movie collections
  - `.push()` for adding movies to the watchlist
  - `.splice()` or `.filter()` for removing items from the watchlist
  - `.map()` for transforming data structures when rendering UI components

- **Dynamic DOM Manipulation:** The application dynamically updates the user interface based on search results and watchlist changes, requiring careful management of event listeners and HTML generation.

- **Modular JavaScript Architecture:** The codebase was organized into separate modules (index.js, watchlist.js, movieUtils.js) to promote code reusability and maintainability across different pages and functionalities.

**Learning Journey Highlights:**

The most significant learning from this project was understanding the difference between modifying object properties directly versus comparing data sets when updating the UI. Initially, a boolean "inWatchlist" property was added directly to movie objects returned by the API. However, this approach caused synchronization issues when removing items from the watchlist - the UI wouldn't update properly because the object property remained unchanged. The solution was to refactor the code to dynamically compare search results against the watchlist array during HTML generation, which eliminated the state management issues and ensured the UI always reflected the current watchlist status.

Another major learning experience involved code organization and dependency management. Starting with all functionality in a single file, the need to share functions between the main search page and the watchlist page led to extracting common utilities into a separate movieUtils.js module. This refactoring process introduced challenges with circular dependencies and event listener management that required careful consideration of module structure and the order of script loading. Working through these architectural decisions provided valuable insights into JavaScript module patterns and dependency management in larger applications.

This project also marked the first time using AI assistance (Claude) as a debugging tool when encountering complex errors. Rather than spending excessive time on trial-and-error debugging, leveraging AI to explain error causes and suggest solutions proved to be an effective learning strategy that accelerated development while still providing educational value about why certain approaches failed.
