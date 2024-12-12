# Idea Share Website

## Specification Deliverable

### Elevator Pitch

Ideas are the world's most underutilized resource. Everyone has them,
but few know what to do with them. Maybe you have an idea
for a book, movie, website, restaurant, or a video game, but you lack the
time / money / skillset required to create it. And so, the idea dies, along
with its potential to become something greater than a passing thought.
This idea sharing website allows you to easily record and publish your
ideas. Your posts are then made available to people around the world who
can combine your inspiration with their skillset to build things you've
only ever dreamed of.

### Design

![Home Page](main_page.png)
![Movies Example Page](movie_page.png)

### Key Features

* Secure login over HTTPS.
* Account creation and login with stored user profile data.
* Ability to create and publish idea posts with tags.
* Post data is stored and displayed to future users.
* Ability to filter posts based on tags.
* Ability for users to upvote posts they like and are interested in.
* Ability for anyone to submit public replies to posts.
* Ability to send and receive direct messages between users.

### Technologies

I am going to use the required technologies in the following ways:
* HTML - Use correct HTML for the structure of my application. HTML pages
  for account creation, login, creating posts, and viewing posts.
* CSS - Application styling that looks good on different screen sizes.
  Uses good whitespace, coloring, and contrast to make each page look good.
* JavaScript - Handles dynamic content. Provides login, post display, upvoting
  posts, and replying to posts.
* React - Updating the viewing page with new posts, replies, upvotes.
* Web Service - Submitting posts, retrieving published posts, likes, replies,
  direct messages, and sending direct messages.
* Database Data - Store post content, user profiles, and messages in a database.
  User information (username, password) is stored securely in the database.
* WebSocket - As users publish posts, the posts are made available to be viewed
  in real time by other users. Likes and direct messages are
  also sent and displayed in real time.

## HTML Deliverable

For this deliverable, I built out the structure of my application using HTML.

- [x] **HTML pages** - Five HTML pages which represent the home/login page, and pages for viewing posts, creating posts, receiving direct messages, and sending direct messages.
- [x] **Links** - Each of the home, inbox, create post, and view posts links to each other. The inbox page has a link to the send message page.
- [x] **Text** - My home page includes a quote, and each page has textual labels to help guide the user.
- [x] **Images** - My image is featured on the home page (index.html) of my website.
- [x] **DB/Login** - Input box and submit button for login. The idea posts represent data pulled from the database.
- [x] **WebSocket** - The inbox page includes realtime messages displayed to the user. Users can also view and 'like' posts, all the data for which is displayed in realtime.

## CSS Deliverable

For this deliverable, I properly styles my application into its final appearance.

- [x] **Header, footer, and main content body** - All properly styled with css to create coherent and visually pleasing pages.
- [x] **Navigation elements** - Navigation bar is correctly styled, looks professional, and can be easily used to navigate the website.
- [x] **Responsive to Window Resizing** - Elements of pages adjust based on screen size to properly fit.
- [x] **Application Elements** - All elements on the web page are properly styled, including colors, font usage, and sizes for forms, text boxes, buttons, etc.
- [x] **Application Text Content** - All text content is properly styled, with good usage of font size and consistent font styles.
- [x] **Application Image** - All images are properly styled to fit on the webpage and adjust in size as needed.

## React Deliverable

For this deliverable, I added JavaScript to implement and/or mock all functionality for my website, and added placeholders for future updates.

- [x] **Transpiled/Bundled Using Vite** - Set up project as a Vite project, converted code to JS/JSX.
- [x] **Multiple React Components**
  - [x] **Login** - When you press the login button, the application stores the userName, and allows you to access and interact with the other pages.
  - [x] **DataBase** - Displaying likes, posts, messages, etc. using localStorage and/or JSX functions. This will be replaced using database data in the future. 
  - [x] **Websocket** - I used local storage, useNavigate, and useLocation hooks to mock the functionality of creating posts, sending messages, replying to messages, etc. These will all be replaced/added onto with WebSocket.
  - [x] **Application Logic** - Pressing the 'like' button increases the number of likes for a post. Data like userName, message recipient, etc. are transferred between pages for use.
- [x] **React Router** - Added react routing between home, view posts, send message, inbox, and create post pages. 
- [x] **React Hooks** - Implemented multiple useState hooks to store and update variables. I also used the useLocation hook to transfer data between pages, and the useNavigate hook for navigation between pages using buttons.

## Service deliverable

For this deliverable, I added backend endpoints that receives and updates user data, posts, messages, and elements within those objects.

- [x] **Node.js/Express HTTP service** - Done
- [x] **Static middleware for frontend** - Done
- [x] **Calls to third party endpoints** - Gets a random quote from a third party service, and displays it on the homepage. 
- [x] **Backend service endpoints** - Placeholders for login that stores the current user on the server. Endpoints for submitting posts, sending messages to other users, replying to messages, liking posts, etc.
- [x] **Frontend calls service endpoints** - Using the fetch function, my frontend calls the service endpoints listed above.

## DB/Login Deliverable

For this deliverable, I integrated mongoDB to store user information, posts, messages, and other data in a database. I also integrated secure / encrypted login capabilities. 

- [x] **MongoDB Atlas database created** - Done
- [x] **Stores data in MongoDB** - Stores a variety of application data (messages, posts, user data).
- [x] **User registration** - Allows for the creation of a new account in the database.
- [x] **Existing user** - Stores posts, messages, sent messages, etc. under the same user if the user already exists. Allows a preexisting user to login with a password, and stores data for that user in the database.
- [x] **Use MongoDB to store and retrieve credentials** - Stores user and their associated posts, messages etc., which is retrieved from the database in other parts of the application.
- [x] **Restricts functionality** - Both the backend and frontend restrict functionality if the user is not authenticated. A user cannot view posts, make posts, view messages, or send messages until logged in.

## WebSocket Deliverable

For this deliverable I attempted to use webSocket to update the votes on the frontend in realtime.

- [x] **Backend listens for WebSocket connection** - Done - My websocket integrates with the service to start a websocket connection.
- [x] **Frontend makes WebSocket connection** - Done - The websocket connection between the frontend and backend is successfully being made. (I just haven't fully figured out how to update the number of likes via this connection).
- [ ] **Data sent over WebSocket connection** - Not done. Actually unsure if this is working. I think it's almost completed, but I didn't have time to finish debugging before the deadline.
- [ ] **WebSocket data displayed** - Not done. Again, couldn't get this working in time :(
- [x] **All Visible Elements Working** - Everything works as I intended for my IdeaShare application. Although the likes do not update in real time, that was never an intended feature for the application. Likes still update in the database, users can post, send messages, reply to messages, etc.

None of my React, Service, DB/Login, or WebSocket have been graded yet, but I already pushed all of them to my production environment before I saw Dr. Clement's message in Canvas, sorry.