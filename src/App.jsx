import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { CreatePost } from './create_post/create_post';
import { Inbox } from './inbox/inbox';
import { ViewPosts } from './view_posts/view_posts';
import { SendMessage } from './send_message/send_message';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    // const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    // const [authState, setAuthState] = React.useState(currentAuthState);

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
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="create-post">Create Post</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="view-posts">View Posts</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="inbox">Inbox</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="send-message">Send Message</NavLink>
                                    </li>
                                </ul>
                                <span className="navbar-text text-light me-3">
                                    Logged in as: {userName}
                                </span>
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
                                // authState={authState}
                                // onAuthChange={(userName, authState) => {
                                //     setAuthState(authState);
                                //     setUserName(userName);
                                // }}
                            />
                        }
                        exact
                    />
                    <Route path='/create-post' element={<CreatePost userName={userName}/>}/>
                    <Route path='/view-posts' element={<ViewPosts/>}/>
                    <Route path='/inbox' element={<Inbox/>}/>
                    <Route path='/send-message' element={<SendMessage />}/>
                    <Route path='*' element={<NotFound/>} />
                </Routes>
                
                <footer className="bg-dark text-white-50">
                    <div className="container-fluid">
                        <span className="text-reset">Nathan Jones</span>
                        <a className="text-reset" href="https://github.com/nathanyjones/startup.git">Source</a>
                    </div>
                </footer>

            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
