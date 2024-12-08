import React, { useState } from 'react';
import './home.css';

export function Home( {userName, loggedIn, onLoginChange} ) {
    const [localUserName, setLocalUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayError, setDisplayError] = React.useState(null);
    const [quote, setQuote] = React.useState("");
    const [quoteAuthor, setQuoteAuthor] = React.useState("");

    React.useEffect(() => {
        fetch('https://quote.cs260.click')
            .then((response) => response.json())
            .then((data) => {
                setQuote(data.quote);
                setQuoteAuthor(data.author);
            })
            .catch();
    }, []);
    
    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }

    const loginOrCreate = async (endpoint) => {
        try {
            console.log("in the try block")
            const response = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify({username: localUserName, password: password}),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            
            console.log(response)

            if (response.status === 200) {
                localStorage.setItem('userName', localUserName);
                console.log("Successfully logged in or created an account.")
                onLoginChange(localUserName, true);
                setDisplayError(null);
            } else {
                setDisplayError('Login failed');
                console.log("Failed to log in or create account")
            }
        } catch (error) {
            console.log(error)
            setDisplayError('Login Failed: You may have a network error.');
        }
    }
    
    const logout = (e) => {
        setLocalUsername("");
        setPassword("");

        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
            .catch(() => {
                // Logout failed. Assuming offline
            })
            .finally(() => {
                localStorage.removeItem('userName');
                onLoginChange(null, false);
            });
    }
    
    return (
        <main className="bg-secondary py-5">
            <section id="welcome" className="container text-center mb-2">
                <h1 className="display-4">Welcome to Idea Share</h1>
                <i>{quote}</i>
                <br />
                <i>- {quoteAuthor}</i>
                <br /><br />
                <img src="/Gemini_Generated_Image_rbhyv7rbhyv7rbhy.jpeg" className="img-fluid rounded" style={{ maxWidth: '80%' }} width="350" alt="AI generated image of lightbulb surrounded by artistic, creative, random objects." />
            </section>
            { !loggedIn && 
                <section id="user-auth" className="container">
                <h3 className="mt-4">Login or Create Account</h3>
                <form id="login" className="bg-secondary">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            className="form-control" 
                            placeholder="username" 
                            required 
                            onChange={(e) => setLocalUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="form-control" 
                            placeholder="password" 
                            required 
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-md-center">
                        <button 
                            className="btn btn-dark me-3"
                            onClick={(e) => {
                                e.preventDefault();
                                loginUser();
                            }}
                            disabled={!localUserName || !password}>Login</button>
                        <button 
                            className="btn btn-dark"
                            onClick={(e) => {
                                e.preventDefault();
                                createUser();
                            }}
                            disabled={!localUserName || !password}>Create</button>
                    </div>
                </form>
            </section> }
            {loggedIn && <button onClick={logout} className="btn btn-dark">Logout</button>}

            {displayError && <p>{displayError}</p>}
        </main>
        
    );
}