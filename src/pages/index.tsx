import { useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import QRCode from 'qrcode';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = useCallback(async () => {
    if (!inputValue.trim()) {
      setError('Please enter a URL or text to generate a QR code.');
      return;
    }

    setError('');
    setIsGenerating(true);

    try {
      const dataUrl = await QRCode.toDataURL(inputValue.trim(), {
        width: 400,
        margin: 2,
        color: {
          dark: '#0f0c29',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      });
      setQrDataUrl(dataUrl);
      setIsGenerated(true);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }, [inputValue]);

  const downloadQR = useCallback(() => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qrcode-digital-heroes.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qrDataUrl]);

  const clearAll = useCallback(() => {
    setInputValue('');
    setQrDataUrl(null);
    setError('');
    setIsGenerated(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') generateQR();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError('');
  };

  return (
    <>
      <Head>
        <title>QR Code Generator — Digital Heroes</title>
      </Head>

      <div className="page-wrapper">
        {/* Animated background orbs */}
        <div className="orb orb-1" aria-hidden="true" />
        <div className="orb orb-2" aria-hidden="true" />
        <div className="orb orb-3" aria-hidden="true" />

        <main className="main-container">
          {/* Header */}
          <header className="hero-header">
            <div className="badge">
              <span className="badge-dot" />
              Free &amp; Instant
            </div>
            <h1 className="hero-title">
              QR Code <span className="gradient-text">Generator</span>
            </h1>
            <p className="hero-subtitle">
              Transform any URL or text into a scannable QR code in seconds.
            </p>
          </header>

          {/* Card */}
          <div className="card">
            <div className="card-inner">

              {/* Input Section */}
              <section className="input-section">
                <label htmlFor="qr-input" className="input-label">
                  Enter URL or Text
                </label>
                <div className="input-wrapper">
                  <span className="input-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </span>
                  <input
                    id="qr-input"
                    type="text"
                    className={`qr-input ${error ? 'qr-input--error' : ''}`}
                    placeholder="https://example.com or any text..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Enter URL or text for QR code"
                    aria-describedby={error ? 'input-error' : undefined}
                  />
                </div>

                {error && (
                  <div id="input-error" className="error-message" role="alert">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </div>
                )}
              </section>

              {/* Action Buttons */}
              <div className="button-group">
                <button
                  id="btn-generate"
                  className={`btn btn-primary ${isGenerating ? 'btn--loading' : ''}`}
                  onClick={generateQR}
                  disabled={isGenerating}
                  aria-label="Generate QR Code"
                >
                  {isGenerating ? (
                    <>
                      <span className="spinner" aria-hidden="true" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <path d="M14 14h3v3M17 17v4M21 14v4h-4" />
                      </svg>
                      Generate QR Code
                    </>
                  )}
                </button>

                {isGenerated && (
                  <button
                    id="btn-clear"
                    className="btn btn-ghost"
                    onClick={clearAll}
                    aria-label="Clear all fields"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                    </svg>
                    Clear
                  </button>
                )}
              </div>

              {/* QR Code Display */}
              {qrDataUrl && (
                <div className="qr-result" role="region" aria-label="Generated QR Code">
                  <div className="qr-display-wrapper">
                    <div className="qr-card">
                      <div className="qr-corner qr-corner--tl" aria-hidden="true" />
                      <div className="qr-corner qr-corner--tr" aria-hidden="true" />
                      <div className="qr-corner qr-corner--bl" aria-hidden="true" />
                      <div className="qr-corner qr-corner--br" aria-hidden="true" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={qrDataUrl}
                        alt="Generated QR Code"
                        className="qr-image"
                        width={280}
                        height={280}
                      />
                    </div>
                    <div className="qr-meta">
                      <p className="qr-meta-label">Scan me with any camera</p>
                      <p className="qr-meta-value" title={inputValue}>
                        {inputValue.length > 48 ? inputValue.slice(0, 48) + '…' : inputValue}
                      </p>
                    </div>
                  </div>

                  <button
                    id="btn-download"
                    className="btn btn-download"
                    onClick={downloadQR}
                    aria-label="Download QR Code as PNG"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download QR Code (PNG)
                  </button>
                </div>
              )}

              <canvas ref={canvasRef} style={{ display: 'none' }} aria-hidden="true" />

            </div>
          </div>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-info">
              <p className="footer-name">SHAIK IRFANJANI</p>
              <a
                href="mailto:irfanjanishaik566@gmail.com"
                className="footer-email"
                aria-label="Email Shaik Irfanjani"
              >
                irfanjanishaik566@gmail.com
              </a>
            </div>
            <a
              id="btn-digital-heroes"
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-heroes"
              aria-label="Visit Digital Heroes website"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Built for Digital Heroes
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}
