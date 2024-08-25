'use client';
import * as React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '../atoms/AppAppBar';
import Hero from '../atoms/Hero';
import LogoCollection from '../atoms/LogoCollection';
import Highlights from '../atoms/Highlights';
import Pricing from '../atoms/Pricing';
import Features from '../atoms/Features';
import Testimonials from '../atoms/Testimonials';
import FAQ from '../atoms/FAQ';
import Footer from '../atoms/Footer';
import getLPTheme from './getLPTheme';
import LeaderBoard from '../organisms/LeaderBoard';
import WhyChooseUs from '../organisms/WhyChooseUs';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100dvw',
                position: 'fixed',
                bottom: 24,
            }}
        >
            {/* <ToggleButtonGroup
                color="primary"
                exclusive
                value={showCustomTheme}
                onChange={toggleCustomTheme}
                aria-label="Platform"
                sx={{
                    backgroundColor: 'background.default',
                    '& .Mui-selected': {
                        pointerEvents: 'none',
                    },
                }}
            >
                <ToggleButton value>
                    <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
                    Custom theme
                </ToggleButton>
                <ToggleButton value={false}>Material Design 2</ToggleButton>
            </ToggleButtonGroup> */}
        </Box>
    );
}

ToggleCustomTheme.propTypes = {
    showCustomTheme: PropTypes.shape({
        valueOf: PropTypes.func.isRequired,
    }).isRequired,
    toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>

            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />


            <Box sx={{ bgcolor: 'background.default', marginTop: '100px' }}>
                <LeaderBoard />
                <Highlights />
                {/* <WhyChooseUs /> */}
                {/* <Hero /> */}
                {/* <LogoCollection /> */}
                {/* <Features />
                <Divider /> */}
                <Testimonials />
                <Divider />
                
                <Divider />
                {/* <Pricing /> */}
                <Divider />
                <FAQ />
                <Divider />
                {/* <Footer /> */}
            </Box>
            <ToggleCustomTheme
                showCustomTheme={showCustomTheme}
                toggleCustomTheme={toggleCustomTheme}
            />
        </ThemeProvider>
    );
}