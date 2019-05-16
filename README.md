This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Table of Contents
- [About](#about)
- [Workflow](#workflow)
- [Technical Workflow](#technical-workflow)
- [Folder Structure](#folder-structure)
- [Run local](#run-local)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
- [youtube presentation](#youtube-presentation)
- [Todo](#todo)


## About
* It is a react + redux web app that fetches movies data from https://api.themoviedb.org and publish them to the end user. 
* It also uses graph libraries D3.js and react-vis to depict different bar charts based on movies data.

[a quick visual of the web-app](readme_imgs/movies.gif)

![final outcome](readme_imgs/movies.gif)

- Functionalities:
  - movies search realtime.
  - sord order by:
    - Popularity asc/desc.
    - Rate asc/desc.
    - Date asc/desc.
  - 'Load more movies' in chunks of 20 items.
  - Bar charts with D3.js and react-vis


* It is written in reactjs + reduxjs and some other dependencies:
- redux-thunk
- D3.js
- react-vis
- prop-types
- lodash
- sass
- webpack
- bootstrap 4
- jquery
- popper
- mocha
- chai
- babel
- eslint with airbnb

## Workflow

* Init: a request to the API_ENDPOINT: https://api.themoviedb.org/..., is done to fetch the movies data.
* The data are consumed and the store is updated with the movies.
* The state , after 'RECEIVE_MOVIES', looks like this:
  ```
  {
    action: [],
    data: {
      isFetching: false,
      movies: [],
      page: 1,
      total_pages: xxxx,
    }
    movie: [],
    search: {
      query: '',
    }
    sort: {
      sortOrder: 'popularity',
      sortType: 'desc',
    }
  }
  ```
* So the user, can navigate through 'Movies' & 'Stats', pages.


## Technical Workflow
1. The app loads and the store is created and initialised.
2. All the actions follow this procedure:
 action -> actionCreator -> reducer -> update the state <- selector gets state data -> update the component
2. For style i use bootstrap4 and sass. As for the webpack to convert the scss custom files to css, i added this snipet, on the webpack config file.
  ```
  {
    test: /\.scss$/,
    use: [{
        loader: "style-loader" // creates style nodes from JS strings
    }, {
        loader: "css-loader" // translates CSS into CommonJS
    }, {
        loader: "sass-loader" // compiles Sass to CSS
    }]
  },
  ```

## Folder structure

I have run `npm run eject`, in order to have better control over, 
webpack, eslint etc.

The structure of the project is this:
```
app/
  config/ <!--webpack config files-->
  node_modules/ <!--dependencies-->
  public/
  scripts/
  src/  <!-- main project code -->
  assets/
    brand/
      logo.svg
  components/
    style/
      components.scss
    customButton.js
    errorPage.js
    header.js
    index.js
    percentage.js
    root.js
    sort.js
  constants/
    constants.js
    index.js
  middlewares/
    logger.js
  modules/
    home/
      actionCreators/
        home.actionCreator.js
        index.js
      actions/
        home.actions.js
        index.js
      reducers/
        home.reducers.js
        index.js
      selectors/
        home.selectors.js
        index.js
      style/
        home.scss
      home.js
    loader/
      style/
        loader.scss
      loader.js
    movie/
      <!-- the same folder structure as 'home-->
    search/
      <!-- the same folder structure as 'home-->
    stats/
      charts/
        barChart.js
        world.js
      lib/
      stats.js
      stats.scss
  index.js
  rootreducers.js <!-- combine root reducers -->
  store.js <!-- projects store-->
  .eslintrc <!-- eslint configuration with rules-->
  package.json
  postcss.config.js <-- enable autoprefixer -->
  README.md
```

## Run local

In order to run localhost you shoul:

* download/clone the repo to a folder
* execute npm install to install all the dependencies
* npm run start
* open your browser on http://localhost:3000/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `npm run build`

By executing `npm run build`, the build folder is creaded and insided the code 
is minified.
We can run the server by executing: `serve -s build`


### `npm run eject`

I have executed this script so, all the hidden files are now visible on the project.
Some useful files are the webpack configuration, which i used to add the 
pre-processor sass.

## Youtube presentation 
  - A quick presentation of the final outcome is here: https://www.youtube.com/watch?v=WbQ9jQtzCIs&feature=youtu.be

## Todo

* add unit tests
