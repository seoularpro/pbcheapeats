import Image from "next/image";
import LandingPage from "../app/components/templates/LandingPage";
// import Navbar from "./components/atoms/molecules/Navbar";
// import { ThemeProvider } from '@mui/material/styles';
import { GoogleTagManager } from '@next/third-parties/google'

export default function Home() {
  return (
    <div>
      {/* <ScrollToTop /> */}
      <LandingPage/>
      <GoogleTagManager gtmId="G-CGHR9EN0JV" />

      {/* <Routes />
      <Footer /> */}
    </div>
  );
}
