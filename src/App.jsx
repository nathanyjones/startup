import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { CreatePost } from './create_post/create_post';
import { Inbox } from './inbox/inbox';
import { ViewPosts } from './view_posts/view_posts';
import { SendMessage } from './send_message/send_message';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const [loggedIn, setLoggedIn] = React.useState(userName ? true : false);

    return (
            <BrowserRouter>
                <div className='body bg-dark text-light'>

                    <header className="container-fluid">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container-fluid">
                                <NavLink className="navbar-brand" to="/">Idea Share</NavLink>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                        aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav me-auto">
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="">Home</NavLink>
                                        </li>
                                        {loggedIn && (
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="create-post">Create Post</NavLink>
                                            </li>
                                        )}
                                        {loggedIn && (
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="view-posts">View Posts</NavLink>
                                            </li>
                                        )}
                                        {loggedIn && (
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="inbox">Inbox</NavLink>
                                            </li>
                                        )}
                                        {loggedIn && (
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="send-message">Send Message</NavLink>
                                            </li>
                                        )}
                                    </ul>
                                    <LoginStatus userName={userName}/>
                                </div>
                            </div>
                        </nav>
                    </header>

                    <Routes>
                        <Route
                            path='/'
                            element={
                                <Home
                                    userName={userName}
                                    loggedIn={loggedIn}
                                    onLoginChange={(userName, loggedIn) => {
                                        setUserName(userName);
                                        setLoggedIn(loggedIn);
                                    }}
                                />
                            }
                            exact
                        />
                        <Route path='/create-post' element={<CreateP