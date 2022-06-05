import Head from "next/head";
import Script from "next/script";
import Nav from "../components/navbar";
import Foot from "../components/footbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <title>SysSecSem</title>
      </Head>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
      />

      <div className="d-flex flex-column min-vh-100">
        <Nav />
        <div className="container mt-3">
          <Component {...pageProps} />
        </div>
        <Foot />
      </div>
    </>
  );
}
export default MyApp;
