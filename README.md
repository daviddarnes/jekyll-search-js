# jekyll-search-js
🔍  Search through your jekyll pages, posts, or any collection the ES6 way. [See a demo](https://daviddarnes.github.io/jekyll-search-js/)

## Installation

1. Download the source files (`src/`) or install with npm
2. Drop these files into your `assets/` directory (or preferred directory)
3. Link the `search.js` file and `fetch.js` polyfill:
  ``` html
  <script type="text/javascript" src="./src/fetch.js"></script>
  <script type="text/javascript" src="./src/search.js"></script>
  ```
4. Initialise a new search:
  ``` html
  <script type="text/javascript">

    // New search using example options
    const search = new jekyllSearch(
      'https://alembic.darn.es/assets/search.json',
      '#search',
      '#list',
      'https://alembic.darn.es'
    );

    // Initialise
    search.init();

  </script>
  ```

## Options
``` js
const search = new jekyllSearch(
  'https://alembic.darn.es/assets/search.json', // Your data source, can be relative or absolute
  '#search', // The selector of your search input field
  '#list', // The selector of your search results wrapper
  'https://alembic.darn.es' // Optional site url for absolute urls
);
```


## To do
- [x] Get js into a class
- [x] Allow options to be set
- [x] Finish installation readme
- [x] Add how to be installed using npm
- [ ] Submit to npmjs.com
