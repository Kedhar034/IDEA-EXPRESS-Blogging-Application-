# IDEA EXPRESS (Blogging Application)

This is a blogging application developed using Node.js, Express.js, and MongoDB. The application allows users to create, update, delete, and view blogs. Additionally, it features user authentication and authorization using JWT (JSON Web Tokens).

## Features

-> User Authentication and Authorization
-> Create, Read, Update, and Delete (CRUD) operations for blogs
-> User profile management
-> View all blogs
-> View individual blog details
-> User activity tracking

## Technologies Used

-> Node.js
-> Express.js
-> MongoDB
-> Mongoose (for MongoDB object modeling)
-> EJS (for templating)
-> JWT (for authentication)
-> Bootstrap (for styling)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```
    git clone https://github.com/your-username/blogging-application.git
    cd blogging-application
    ```

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Set up MongoDB:**
    - Ensure MongoDB is installed and running on your machine.
    - Create a database named `IdeaExpress`.

4. **Set up environment variables:**
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
      ```
      MONGO_URL=mongodb://127.0.0.1:27017/IdeaExpress
      JWT_SECRET=your_jwt_secret
      ```

5. **Run the application:**
    ```
    npm start
    ```

7. **Visit the application:**
    - Open your web browser and go to `http://localhost:9000`

## Functionalities

-> **Home Page:** View all blogs.
-> **My Account:** View your profile details, total blogs, and your blogs.
-> **Create Blog:** Add a new blog.
-> **Edit Blog:** Update an existing blog.
-> **Delete Blog:** Remove a blog.
-> **User Authentication:** Sign up and log in to manage your blogs.

## Routes

### Auth Routes
- `GET /signup` - Show signup form
- `POST /signup` - Handle user registration
- `GET /signin` - Show signin form
- `POST /signin` - Handle user login
- `GET /logout` - Handle user logout

### Blog Routes
- `GET /` - Show all blogs (HOMEPAGE)
- `GET /blog/:id` - Show a single blog
- `GET /new` - Show form to create a new blog
- `POST /blogs` - Create a new blog
- `DELETE /blog/:id` - Delete a blog

### User Routes
- `GET /account` - Show user's account details


###  Project Structure
├── models
│ ├── blog.js
│ └── user.js
├── public
│ ├── css
│ │ └── styles.css
│ └── images
├── routes
│ ├── auth.js
│ ├── blog.js
│ └── index.js
├── views
│ ├── account.ejs
│ ├── blog.ejs
│ ├── edit.ejs
│ ├── home.ejs
│ ├── login.ejs
│ ├── new.ejs
│ ├── partials
│ │ ├── head.ejs
│ │ ├── nav.ejs
│ │ └── script.ejs
│ ├── register.ejs
│ └── view.ejs
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md








