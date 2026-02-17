import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">Creatividad que brilla en cada detalle</h1>
                    <p className="hero-subtitle">
                        Hola, soy Leidy Dayana. En Purpurina transformamos lo cotidiano en algo mágico con papelería creativa diseñada para inspirarte.
                    </p>
                    <div className="hero-actions">
                        <a href="#services" className="btn-primary">Ver Catálogo</a>
                        <a href="#about" className="btn-secondary">Nuestra Historia</a>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="/assets/hero.svg" alt="Ilustración Purpurina" className="floating" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
