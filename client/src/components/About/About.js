import React from 'react';
import './About.css';
import logoPng from '../../Assets/logo.png'
export const About = () => {
    const description = `something something something something something something something something Can someone fill this with a nice description about our company/website?`
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