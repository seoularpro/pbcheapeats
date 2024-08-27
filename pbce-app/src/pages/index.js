import Image from "next/image";
import LandingPage from "../app/components/templates/LandingPage";
// import Navbar from "./components/atoms/molecules/Navbar";
// import { ThemeProvider } from '@mui/material/styles';
import GoogleAnalytics from '../app/GoogleAnalytics';


export default function Home() {
  return (
    <div>
      {/* <ScrollToTop /> */}
      <GoogleAnalytics/>
      <LandingPage/>

      {/* <Routes />
      <Footer /> */}
    </div>
  );
}
