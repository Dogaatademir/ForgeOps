import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Button from './Button'; // 2. adımda oluşturduğumuz Button

/**
 * Opsiron Error Boundary
 * * Uygulama genelinde yakalanmamış JavaScript hatalarını tutar.
 * * Kullanıcıya "Beyaz Ekran" yerine anlamlı bir hata sayfası gösterir.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  // Hata olduğunda state'i güncelle (UI render için)
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Hatayı logla (Console veya Sentry gibi servisler için)
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    
    // TODO: Prodüksiyonda burayı bir loglama servisine (Sentry, LogRocket vb.) bağlayacağız.
    console.error("Opsiron System Error:", error, errorInfo);
  }

  // Sayfayı yenileme fonksiyonu
  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // FALLBACK UI
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: 'var(--bg-secondary, #f8f9fa)',
          color: 'var(--text-main, #333)'
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            maxWidth: '500px',
            width: '100%'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '50%',
              marginBottom: '1.5rem',
              color: 'var(--status-critical, #ef4444)'
            }}>
              <AlertTriangle size={32} />
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>
              Beklenmedik Bir Hata Oluştu
            </h2>
            
            <p style={{ color: 'var(--text-muted, #666)', marginBottom: '2rem', lineHeight: '1.6' }}>
              Operasyonel bir aksaklık yaşandı. Teknik ekibimiz durumdan haberdar edildi. Lütfen sayfayı yenilemeyi deneyin.
            </p>

            {/* Hata Detayı (Sadece Development Ortamında Göster) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div style={{
                textAlign: 'left',
                backgroundColor: '#f1f1f1',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                marginBottom: '2rem',
                overflowX: 'auto',
                color: '#d63384'
              }}>
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="primary" 
                onClick={this.handleReload}
                icon={RefreshCcw}
              >
                Sayfayı Yenile
              </Button>

              <Button 
                variant="outline" 
                to="/" 
                icon={Home}
                onClick={() => this.setState({ hasError: false })} // State'i sıfırla
              >
                Ana Sayfa
              </Button>
            </div>
          </div>

          <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-light, #999)' }}>
            Hata Kodu: OPS-{Math.floor(Math.random() * 1000) + 1000}
          </p>
        </div>
      );
    }

    // Hata yoksa normal akışa devam et
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;