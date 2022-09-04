# Ripped

![MediMap layout across different devices]()

Live demo can be accessed [here]().

## Project Overview 

**Context and Value Proposition**


**Target Audience**
  

**Organisation Goals** 
 

**User Goals**


## UI/UX 

**1. Strategy**

**User** 

- Demographic: Users may fall into either of the following - forgetting to bring their long term medications when travelling overseas, falling short of current supplies before travelling back (foreigner) or next appointment (locals/foreingers)

- Needs: To know whether a medication is available in Singapore, whether it can be bought off-the-counter, and where the medications can be bought.

- Pain points: Information about classification of medications on Health Science Authority's website is difficult to find. 

| User Stories | Acceptance Criteria(s) |
| ------------ | ---------------------- |
| As a parent whose child is down with a runny nose, I want to know if I am able to get the medication that the doctor had prescribed previously without having to go back to the clinic | Search function that show the classification of the medication and able to zoom in to show pharmacies that are within 1km of her current location| 
| As a owner of pharmacy outlet, I would want to know what are the common searches that users have input to tailor future marketing and education outreahch | History of user inputs are stored |  

**2. Scope** 

**Functional**

- Perform search on either landing or map page
- Alert to show classification of medication (or unavailable) after performing searches 
- Table to display search results, able to filter based on either brand name or classification of medications 
- Legend to display information about the markers 
- Quick access to previous searches 
- Zoom in on current location and pharmacies 1km within current location 

**Non-Functional** 

- Application is mobile responsive, with small screen having a navigation bar to avoid clutteredness on the screen 

**3. Structure** 

![Structure]() 

**4. Skeleton**

![Skeleton]()

**5. Surface**

**Fonts** 

Proza Libre is used as the font for the application title on the landing page because of it's professional outlook. 

**Icons** 

- Fontawesome icons: to indicate home (to toggle from map to landing page), dropdown (to toggle for more functionalities), search, legend, zoom in. Able to style according to intention (colours, size etc) 
- Flaticons: 5 distinct icons that intuitively represent - current location, general sales list stores, pharmacy-only medications stores, prescription only medicatios stores and hospitals  


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

- [Google Font](https://fonts.google.com/specimen/Proza+Libre) - Landing page title 
- [Font Awesome](https://fontawesome.com/) - Icons for navigation 
- [React Bootstrap Icons](https://www.npmjs.com/package/react-bootstrap-icons)
- [Bootstrap 5](https://getbootstrap.com/) - Components and utilities
- [Unsplash](https://unsplash.com/) - Landing page backgroud image  
- [Coolors](https://coolors.co/820263-d90368-eadeda-2e294e-ffd400) - Choosing complementary colours
 

**Others** 
- [Lucidchart](https://www.lucidchart.com/pages/) - Design structure of page 