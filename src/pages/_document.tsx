import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="Generate QR codes instantly for any URL or text. Fast, free, and beautiful QR Code Generator built for Digital Heroes." />
        <meta property="og:title" content="QR Code Generator — Digital Heroes" />
        <meta property="og:description" content="Generate QR codes instantly for any URL or text. Free, fast, and beautiful." />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#0f0c29" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
