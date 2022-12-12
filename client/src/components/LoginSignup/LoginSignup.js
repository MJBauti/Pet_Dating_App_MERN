import React from 'react';

export const LoginSignup = () => {
    const description = `page intro page intro page intro page intro page intro page intro page intro page intro page intro page intro page intro page intro page intro page intro page intro page intro page intro page intro 
    page intro page intro page intro page intro page intro page intro page intro page intro `
    const loginForm = `login and signup function here login and signup function here login and signup function here login and signup function here login and signup function here login and signup function here 
    login and signup function here login and signup function here login and signup function here `
    return (
        <section id="Home" className="about">
            <main className="main" maxwidth="md">
                <div className="about">
                    <div className="_content_wrapper">
                        <h2>
                            {description}
                        </h2>
                    </div>
                    <div className="_content_wrapper">
                        <h2>
                            {loginForm}
                        </h2>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default LoginSignup;