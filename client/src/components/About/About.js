import React from 'react';
import './About.css';
import logoPng from '../../Assets/logo.png'


export const About = () => {
    const description = `Welcome to Pawfect Match, the place where pet lovers
     can connect and find their perfect match. Whether you're looking for a furry
      companion to play fetch with, a playmate for your furry friend, to make a new friend,
       or find your own match, you'll find what you're looking for here. Our members are all animal lovers,
        so you can trust that your pets will be in good hands. Join now and start your
         search for your pawfect match!`
    return (
        <section id="About">
            <main className="main" maxwidth="md">
                <div className="about">
                <div className="_img"
                    style={{ 
                        background: "url(" + logoPng + ")",
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'turquoise',
                    }}
                >
                </div>
                    <div className="_content_wrapper">
                        <h2>
                            {description}
                        </h2>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default About;