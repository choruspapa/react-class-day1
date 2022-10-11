# react-class-day1

## Start

### create project

```
npm run create-react-app react-class-day1
cd react-class-day1
code .
```

### install package

```
npm install bootstrap --save
```

## Day1

### Component CardList

add new file cardlist.js

create class CardList

    - import React, Component
    - extends Component
    - export default

build render method: JSX

let assignment, className attribute, {} syntax

import cardlist.js into App.js

add tag CardList in render method.

add propTypes, defaultProps

add attribute of CardList tag

### Component Counter

create class Counter

add state

    - initialize in constructor 
    - setState method
    - binding this instance

binding button event

add on App.js

    - import counter.js
    - add Counter tag on render method
    
### Iteration of list

create class ListItem

ListItem tag render method

import listitem.js into cardlist.js

add iteration method to generate array of ListItem tag

add calling of iteration method on render 

## Day2

```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
npm install --save-dev webpack webpack-dev-server webpack-cli
```

add webpack.config.js

