import React from 'react';
import logoPng from '../../Assets/logo.png'
import MainBody from '../MainBodyLayout/MainBody'

export const Contact = () => {
    const description = `something something something something something something something something Can someone fill this with a nice description about our company/website?`
    return (
        <MainBody>
            <section id="Contact">
                <main className="main" maxwidth="md">
                    <div className="about">
                    <div className="_img"
                        style={{ 
                            background: "url(" + logoPng + ")",
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: 'skyblue',
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
        </MainBody>
    );
};

export default Contact;