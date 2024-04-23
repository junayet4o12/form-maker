# Formify App Readme

Welcome to Formify, the ultimate web page for creating your own forms and collecting data from others. It is a great alternative to Google Forms, offering more user-friendliness and speed. This React project is powered by Vite, and is designed to allow you to create and update forms as you wish, and collect data from others by sharing the form with people. Formify leverages Firebase for authentication, as well as Node.js, Express.js, MongoDB, JWT and Mongoose for backend services, and ImgBB for image hosting. With a plethora of features to enhance your data-collecting needs, Formify is also a community-based site.

## Features
- **1. Login and Register:** Firebase has implemented authentication. The login and registration system is now more secure after implementing JWT in the backend to secure the API.

- **2. Create and update Form:** The user has complete control over creating and sharing customizable forms to collect data, and can confidently make changes to the form as needed.

- **3. Showing collecting data:** The owner of the form has the ability to view collected data both individually and in table formats, with a user-friendly experience.

- **4. Backend:** MongoDB was used as the database while Node.js, Express.js and Mongoose were utilized to optimize MongoDB's functionality. Mongoose streamlines the backend by rejecting unnecessary data.

- **5. Single page application:** This project is a single-page application made using React, React Router DOM, and many other related technologies. This makes the project more user-friendly and error-free.


## Live Preview: [Formify](https://formify-99f7d.web.app/)

## Environment Variables

To run the app locally or in a production environment, ensure the following environment variables are set in .env.local file:

- **Firebase Environment Variables:**
  <br> VITE_apiKey
  <br> VITE_authDomain
  <br> VITE_projectId
  <br> VITE_storagebucket
  <br> VITE_messagingSenderId
  <br> VITE_appId

- **ImgBB hosting api:** Provide credentials or URLs for image hosting services used within the app.
  <br> VITE_IMG_HOSTING_KEY


## Getting Started

1. Clone this repository to your local machine.
2. Install dependencies using `npm install` or `yarn install`.
3. Set up your environment variables.
4. Run the development server using `npm run dev` or `yarn dev`.
5. Open your browser and navigate to `localhost:5173` to access the app.

Alternatively, you can visit  [https://formify-99f7d.web.app/](https://formify-99f7d.web.app/) to explore the live version of the app.

## Contributor

- [Junayet Alam ](https://github.com/junayet4o12)

## Feedback and Support

We welcome any feedback or suggestions for improvement. If you encounter any issues, please open an issue on our GitHub repository.
