# NC-News

## About

NC-News is a social news aggregation site similar to [Reddit](https://www.reddit.com/) developed with React, CSS3 and Bootswatch.

This project aims to demonstrate some of the skills learnt in front end part of the Northcoders bootcamp, such as:

- React Lifecycle
- React Routing
- React Hooks and custom Hooks
- Optimistic Rendering
- Error Handling
- API requests and handling/displaying response data

The back end for this project was created during the back end part of the Northcoders course and can be found here: https://github.com/KateChern/Northcoders-news-b-end

A hosted version of the back end can be found here: https://northcoders-news-b-end.herokuapp.com/api

## Description

`A hosted version` of this NC-News app can be found at https://nc-news-front-e.netlify.app
<br>
NC-News is responsive with a mobile first approach.
<br>

1. The home page loads all the available articles on the data base.

Articles can be then:

- filtered by topics,
- Sorted by order or
- Sorted by other criterias.

2. Each `article` has user curated ratings and `can be up or down voted` using the API. <br> 
3. `Comments` can also be `up or down voted`. <br> 
4. In order to vote on a post or a comment as well as `post a comment` the user needs to `login`. <br> 
5. A user can `remove` any comments which they have added.

## Setup

You will need Node.js version 16.13.2 or higher and npm version 8.1.2 installed before being able to run this project.

## Installation

To run this project you will need to clone this repository onto your local machine.

```
$ git clone https://github.com/KateChern/NC-News
```

Navigate inside the folder and install all dependencies by entering the following commands on your terminal window:

```
$ cd NC-News
$ npm install
```

To run the application locally enter:

```
$ npm start
```

The application will run on http://localhost:3000.
