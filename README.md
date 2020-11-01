# My Developer Portfolio 😊
**A portfolio website made with React and React-Spring for animations.**

Used Created-React-App for this project so to run locally
- clone
- npm/yarn install
- npm/yarn start

<br/>

### Desktop/Mobile Preview :
<img align="left" height="300" src="./desktop-preview.gif">
<img height="300" src="./mobile-preview.gif">

### Inspiration taken for some of the elements implemented
[Loader animation](https://dribbble.com/shots/5942330-AVST-Loader-and-Blog-Animation) <br />
[Technology and Timeline page](https://dribbble.com/shots/6151028-Hotel-Concept) <br />
[Project description page (title header animation)](https://dribbble.com/shots/8712182-Go-green-Marketing-Site) <br />


### Seperate examples from the portfolio 
**(for simple reference, to avoid mixup of other logics in the project)**
* [Page Transition Example](https://github.com/riyaz942/web-portfolio/tree/master/src/app/examples/pageTransition)
* Auto adjusting scroll elements (working on)

### Architecture and some note on the application
```text
  -src
    -app
      -common      // Contains styles and custom components, hocs and utils,
      -constants   // Project constants and strings
      -examples    // Seperate animation example that is taken from the project for better readability
      -modules     // Pages and individual components
    -assets        // self explainatory
      -icons
      -images
```

* Have used webpack's resolve.alias to alias some of the common paths to reduce relative imports in the project. <br />
* Mostly Used Scss, Flexbox, Media-Queries for styling, layouting and responsiveness, haven't used any css framework in this
* Used React-Spring for majority of the animations
