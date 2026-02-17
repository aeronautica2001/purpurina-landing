import './CTA.css';

const CTA = () => {
    return (
        <section id="contact" className="cta">
            <div className="container cta-box glass">
                <h2 className="cta-title">¿Lista para llenar tu mundo de color?</h2>
                <p className="cta-text">Chatea con Leidy Dayana y haz tu pedido personalizado hoy mismo.</p>
                <a href="https://wa.me/573229457923?text=Hola%20quiero%20información%20sobre%20sus%20productos" target="_blank" rel="noopener noreferrer" className="btn-whatsapp" aria-label="Chatear con Leidy Dayana por WhatsApp">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.582 2.166 2.234-.58c1.012.609 1.906.931 3.1.932h.001c3.181 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.767-5.766zm3.375 8.202c-.147.415-.852.767-1.2.814-.347.046-.78.077-1.23-.077-.282-.097-.732-.234-1.272-.464-2.288-.973-3.774-3.321-3.889-3.472-.115-.151-.937-1.246-.937-2.378 0-1.132.593-1.69.804-1.916.211-.225.46-.282.613-.282.153 0 .307.001.442.007.147.006.347-.056.543.414.2.474.69 1.684.75 1.804.06.12.1.259.02.414-.079.155-.12.253-.24.394-.12.141-.253.315-.36.423-.12.12-.245.251-.106.49.14.24.621 1.025 1.334 1.66.917.817 1.689 1.07 1.929 1.189.24.12.381.1.522-.056.141-.156.613-.715.776-.957.164-.243.327-.204.55-.12.223.084 1.413.666 1.655.787.243.12.404.18.463.282.059.103.059.596-.089 1.01z" />
                    </svg>
                    Chatear por WhatsApp
                </a>
            </div>
        </section>
    );
};

export default CTA;
