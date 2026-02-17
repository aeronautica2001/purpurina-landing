import './About.css';

const About = () => {
    return (
        <section id="about" className="about">
            <div className="container about-container">
                <div className="about-image">
                    <div className="portrait-frame">
                        <img src="/assets/frame.svg" alt="Marco Decorativo" className="frame-svg" />
                        <div className="photo-placeholder">
                            <span>LB</span>
                        </div>
                    </div>
                </div>
                <div className="about-content">
                    <h2 className="section-title-alt">Conoce Purpurina</h2>
                    <p>
                        Purpurina nació del sueño de <strong>Leidy Dayana</strong> por llenar el mundo de color y creatividad. Creemos que cada trazo y cada nota merecen ser especiales.
                    </p>
                    <p>
                        Nuestra misión es ofrecerte artículos de papelería que no solo sean útiles, sino que también cuenten una historia y reflejen tu personalidad única.
                    </p>
                    <div className="about-values">
                        <div className="value-item">
                            <span className="dot pink"></span>
                            <span>Diseño Original</span>
                        </div>
                        <div className="value-item">
                            <span className="dot blue"></span>
                            <span>Pasión Creativa</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
