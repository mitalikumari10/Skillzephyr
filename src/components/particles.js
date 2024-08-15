import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticlesComponent = ({ theme }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  // Define particle color based on theme
  const particleColor = theme === 'light' ? '#B0B0B0' : '#ffffff'; // Greyish for light mode, white for dark mode

  const particlesOptions = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    particles: {
      links: {
        color: particleColor,
        distance: 100,
        enable: true,
        opacity: 0.7,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        outModes: {
          default: 'out',
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 60,
      },
      opacity: {
        value: 0.8,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 0.2, max: 1 },
        animation: {
          enable: true,
          speed: 5,
          minimumValue: 0.5,
          sync: false,
        },
      },
      color: {
        value: particleColor,
        animation: {
          enable: true,
          speed: 10,
          sync: false,
        },
      },
      glow: {
        enable: true,
        distance: 200,
        color: particleColor,
        opacity: 0.6,
      },
    },
    detectRetina: true,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />
    </div>
  );
};

export default ParticlesComponent;
