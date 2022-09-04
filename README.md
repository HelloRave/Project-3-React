# Ripped

![Ripped layout across different devices]()

Live demo for customers can be accessed [here](https://mrripped.netlify.app/).
* Test Account: 
    * Email: hellorave@gemail.com
    * Password: asdfg

Live demo for admin/shop owners can be accessed [here](https://hww-tgc18-project-03.herokuapp.com/admin/login).
* Test Account: 
    * Email: janedoe@gemail.com
    * Password: qwerty

## Project Overview 

**Context and Value Proposition**


**Target Audience**
  

**Organisation Goals** 
 

**User Goals**


## UI/UX 

**1. Strategy**

**User** 

- Demographic: Athlete or gym goer looking for protein supplements to meet their nutritional goals 

- Needs: Search for protein supplements according to their category of usage and/or allergens 

- Pain points: most ecommerce stores sell only one or selected brands of protein supplements  

| User Stories | Acceptance Criteria(s) |
| ------------ | ---------------------- |
| As a gym goer/athlete, I woud like to look for familiar brands/flavours of protein supplements that I usually consume | Website helps users to search products by product name, brand or flavours |
| As a gym goer/athlete with known allergies, I woud like to look avoid protein supplements with allergens to consume | Products are labelled with the types of allergens they contain |
| As an ectomorph or endomorph body type, I would like to be able to look for protein supplements to bulk up or to aid in weight loss | Website helps users to search products category (eg. Mass gainer, fat burner etc) |

**2. Scope** 

**Functional**

* For customers: 
    * Account registration, view profile, login and logout
    * Browse product listing, filter/search products and view details of individual product
    * Add products to cart 
    * Cart management (update quantity of products, remove products from cart and checkout/make payment via Stripe)

* For admins/shop owners: 
    * Register, login and logout for admin/shop owner
    * Product and product's variants management (create, read, update, delete)
    * Filter/search for products
    * Orders management (view order details, update order status, delete order)
    * Filter/search for orders

**Non-Functional** 

- Application is mobile responsive

**3. Structure** 

![Structure](/project-03/readme/Structure.png) 

Checkout, order details, user profile and logout are only accessible after user has logged in successfully. 

**4. Skeleton**

![Skeleton]()

**5. Surface**

**Fonts** 



**Icons** 



## Technologies Used 

Technology                                                                                  | Description
------------------------------------------------------------------------------------------  | -----------
[Stripe](https://stripe.com/)                                                               | Payment gateway
[axios](https://github.com/axios/axios)                                                     | Axios as HTTP client to Express server endpoints
[Bootstrap 5](https://github.com/twbs/bootstrap)                                            | Bootstrap is used to create a mobile responsive web application
[ReactJS](https://reactjs.org/)                                                             | ReactJS is a frontend JavaScript framework used for building user interfaces specifically for single-page application
[react-hook-form](https://github.com/react-hook-form/react-hook-form)                       | React-Hook-Form is used to handle and validate forms in the application. 
[react-lottie-player](https://github.com/mifi/react-lottie-player)                          | Lottie is a JSON-based animation file format which is used for the loading animation for the web application.
[react-router-dom](https://github.com/remix-run/react-router)                               | Declarative routing for ReactJS
[react-toastify](https://fkhadra.github.io/react-toastify/introduction)                     | Toast notification for ReactJS

## Testing 

Test Cases can be found [here]()

## Deployment 

**Frontend Deployment**

The React app is hosted using [Netlify](https://www.netlify.com/).

1. Sign up for an account at Netlify
    - Go to https://www.netlify.com/ and log in with your Github account. 
2. Commit and push your code to Github
    - Commit and push your latest code.
3. Create a new site from Git
    - Click on "New site from Git"
4. Choose Continuous Deployment
5. Select or search for your repo 
    - Select the repo to deploy and select the Deploy Site button.
6. Wait for deployment to be done

**Backend Deployment**

Express server is deployed using [Heroku](https://www.heroku.com/).

Prerequisites:
- Heroku is connected and authorized to Github account under "Deploy"
- Correct repository is selected under "App connected to Github"
- Automatic deploys have been enabled for continuous deployment

Steps to publish:
1. After connecting to repository, ensure edits were added, commited, and pushed to Github repository
2. Heroku will perform automatic deployments upon detecting changes

## Challenges and Future Implementations 



## Credits 

**Fonts, Icons and Images** 

- [Google Font](https://fonts.google.com/specimen/Proza+Libre) 
- [Font Awesome](https://fontawesome.com/) 
- [React Bootstrap Icons](https://www.npmjs.com/package/react-bootstrap-icons)
- [Bootstrap 5](https://getbootstrap.com/) - Components and utilities
- [Unsplash](https://unsplash.com/) - Landing page backgroud image  
- [Coolors](https://coolors.co/820263-d90368-eadeda-2e294e-ffd400) - Choosing complementary colours
 

**Others** 
- [Lucidchart](https://www.lucidchart.com/pages/) - Design structure of page 