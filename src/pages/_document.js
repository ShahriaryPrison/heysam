import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
          {/* Remove FOUC style once DOM is ready, don't wait on fonts */}
          <script dangerouslySetInnerHTML={{ __html: `(function(){function r(){document.querySelectorAll('style[data-next-hide-fouc]').forEach(function(e){e.parentNode&&e.parentNode.removeChild(e)});document.body&&(document.body.style.display='');}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',r);}else{r();}})();` }} />
          {/* Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-SHPP4800J2"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SHPP4800J2');
            `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
