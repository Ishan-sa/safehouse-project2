import '../styles/globals.css';
// import Navbar from '../components/D3Components/Navbar/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* <Navbar /> */}
    </>
  )
}

export default MyApp;