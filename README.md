# Formify

Formify is a powerful and user-friendly web application designed for creating customizable forms and collecting responses. It serves as a faster alternative to Google Forms, allowing users to seamlessly design, manage, and analyze form submissions. Built with **React** and powered by **Vite**, Formify leverages **Firebase** for authentication, **Node.js** and **Express.js** for the backend, and **MongoDB** for database management. The app integrates **ImgBB** for image hosting, enabling users to build a variety of forms and manage them efficiently.

## 📑 Table of Contents

<nav>
  <ul style="display: flex; list-style-type: none; padding-left: 0; justify-content: space-around; background-color: #f3d559; padding: 10px; border-radius: 8px;">
    <li><a href="#-features" style="text-decoration: none; color: #3B3B55;">✨ Features</a></li>
    <li><a href="#-tech-stack" style="text-decoration: none; color: #3B3B55;">🛠 Tech Stack</a></li>
    <li><a href="#-installation" style="text-decoration: none; color: #3B3B55;">🚀 Installation</a></li>
    <li><a href="#-usage" style="text-decoration: none; color: #3B3B55;">⚙️ Usage</a></li>
    <li><a href="#-environment-variables" style="text-decoration: none; color: #3B3B55;">🔑 Environment Variables</a></li>
    <li><a href="#-contributing" style="text-decoration: none; color: #3B3B55;">🤝 Contributing</a></li>
    <li><a href="#-license" style="text-decoration: none; color: #3B3B55;">📄 License</a></li>
    <li><a href="#-contact" style="text-decoration: none; color: #3B3B55;">📬 Contact</a></li>
  </ul>
</nav>
## ✨ Features
- **User Authentication**: Secure authentication powered by **Firebase**, supporting user registration, login, and session management.
- **JWT Security**: API protection using **JSON Web Tokens** to ensure data privacy and security.
- **Form Creation & Management**: Intuitive interface for creating, updating, and managing customizable forms.
- **Data Collection & Analysis**: View and analyze form submissions in a user-friendly format, with options to review individual responses or tabulated data.
- **Image Hosting**: Integrated **ImgBB** API for seamless image uploads and hosting within forms.

## 🛠 Tech Stack
- **Frontend**: React, Vite, React Router DOM
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: Firebase, JWT
- **Image Hosting**: ImgBB

## 🚀 Installation

### Prerequisites
- **Node.js**
- **npm** or **yarn**
- Firebase project setup (for authentication)
- ImgBB API key (for image hosting)

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/junayet4o12/formify.git
    cd formify
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure environment variables:**
    Create a `.env.local` file in the root of your project and add the required Firebase and ImgBB configuration:
    ```env
    # Firebase Configuration
    VITE_apiKey=your-firebase-api-key
    VITE_authDomain=your-firebase-auth-domain
    VITE_projectId=your-firebase-project-id
    VITE_storagebucket=your-firebase-storage-bucket
    VITE_messagingSenderId=your-firebase-messaging-sender-id
    VITE_appId=your-firebase-app-id

    # ImgBB Configuration
    VITE_IMG_HOSTING_KEY=your-imgbb-hosting-api-key
    ```

4. **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

## ⚙️ Usage
1. **Sign Up / Login**: Users can create an account or log in using Firebase authentication.
2. **Create Forms**: Once logged in, users can create and customize forms, adding fields and configuring the form settings.
3. **Share Forms**: After creating a form, users can share the form link with others to collect responses.
4. **View Responses**: Users can view form submissions in a clean interface, with options to review individual responses or download the data for further analysis.

## 🔑 Environment Variables
Make sure to configure the following environment variables in your `.env.local` file:

- **Firebase Variables**:
  - `VITE_apiKey`
  - `VITE_authDomain`
  - `VITE_projectId`
  - `VITE_storagebucket`
  - `VITE_messagingSenderId`
  - `VITE_appId`

- **ImgBB Hosting API**:
  - `VITE_IMG_HOSTING_KEY`

## 🤝 Contributing
Contributions are welcome! If you'd like to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📬 Contact
For any inquiries or feedback, please reach out to:

- **Name**: Junayet Alam
- **Email**: muhammadjunayetmaruf@gmail.com
- **Portfolio**: [junayet-portfolio.com](https://junayet-alam-portfolio.vercel.app/)

---

Thank you for using Formify!
