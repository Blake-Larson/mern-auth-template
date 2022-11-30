# MERN - Auth - Template

A template to use for full-stack MERN apps with authentication and MVC backend organization.

**Link to project:** https://mern-auth-template-example.herokuapp.com/

<p align="center" ><img align="center" src="https://github.com/Blake-Larson/mern-auth-template/blob/main/client/src/assets/mern-auth-template-photo.png" alt="The inital view of Mern-Auth-Template" /></p>

## How It's Made:

### Tech used:

**HTML, CSS, JavaScript, React, Node, Express, TailwindCSS**

### Front-End

The front-end for this app was built using React and Tailwindcss along with Axios, React-router-dom, and DaisyUi (a Tailwindcss component library). The React authentication method revolves around the RequireAuth and useAuth components. useAuth uses react context to extend the auth state to any component under the AuthProvider. The RequireAuth component provides a way to check for authentication on specific routes, such as the Dashboard. Because this is a template, I left the rest of the React app pretty simple with a public home page and a private dashboard page.

### Back-End

The back-end for this app was built using Node, Express, Mongoose, and MongoDB along with Passport-local, Express-session, and Bcrpyt for authentication. The backend is based off of an MVC architecture with the views being in the client folder. The routes and controller handle login, logout, signup, and authenticated to check if the current user has an authenticated session stored.

## Optimizations

While I want to keep this template simple, I know that there is more work to be done refactoring how I handle authentication.<br>  
My next steps are:

- Ensure authentication is using best practices and is secure.
- Possibly look into using cookies along with express-session.
- Fix the RequireAuth component to redirect to home page if the user is not authenticated.

## Lessons Learned:

I have really become familar with MVC architecture and navigating the backend. I have also learned that there are so many ways to authenticate your applications and they all have their pros and cons. It was a challenge to try to keep the authentication simple while still being secure.

## Instructions:

### Setup

- npm install in the root directory
- cd client and npm install
- Rename both the server side and client side .envexample to .env
- Add your MongoDB string
- While in root directory run 'npm run dev'
- Open a split terminal, cd client, and run 'npm start'

### Hosting

I currently have this template setup to host on heroku but you're welcome to use another hosting service if you prefer.

- Run 'heroku login'
- Run 'heroku create app-name' through the heroku cli
- Add a new commit and push to your repo
- Run 'git push heroku main'

Add the following Config Vars to Heroku

- REACT_APP_API_URL = https://mern-auth-template-example.herokuapp.com/api (Use your app url and don't forget the /api here)
- DB_STRING = your MongoDB String
- SESSION_SECRET = whatever word you want to use

## Other Work:

Take a look at some other projects I have.

**My Music Studio:** [Live Site](https://my-music-studio.herokuapp.com/) | [Repo](https://github.com/Blake-Larson/my-music-studio)

**Karissa Derousseua: A client Website** [Kdconciergept.com](https://kdconciergept.com/)
