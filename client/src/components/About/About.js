import React from 'react';
import './About.css';
import logoPng from '../../Assets/logo.png'


export const About = () => {
    const description = `Welcome to our Pawfect Help, where we raise funds for local pet shelters. 
    Our mission is to help provide the necessary resources for these shelters to care for abandoned, neglected, and homeless pets. 
    With your support, we are able to make a real difference in the lives of these animals.
    You can also make a donation directly to a specific shelter or make a general donation to be used where it is needed most.
    We appreciate your support and hope that you will join us in our efforts to improve the lives of pets in need. 
    Together, we can make a positive impact on the lives of these animals and give them the love and care they deserve.!`
    return (
        <section className="aboutWrap" id="About">
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