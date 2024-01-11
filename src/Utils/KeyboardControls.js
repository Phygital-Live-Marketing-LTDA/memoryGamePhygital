import React, { useState, useEffect } from 'react';

// Este é um HOC que adiciona controles de teclado ao componente que ele envolve
function withKeyboardControls(WrappedComponent) {
  return function(props) {
    const [showButton, setShowButton] = useState(true);
    const [cursorVisible, setCursorVisible] = useState(true);

    // Função para alternar o modo de tela cheia
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    // Efeito para adicionar o listener de eventos de teclado
    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.key === 'f') {
          toggleFullScreen();
        } else if (e.key.toLowerCase() === 'k') {
          setShowButton(prev => !prev);
        } else if (e.key.toLowerCase() === 'l') {
          setShowButton(true);
        } else if (e.key.toLowerCase() === 'c') {
          setCursorVisible(prev => !prev);
        }
      };

      window.addEventListener('keydown', handleKeyPress);

      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, []);

    // Efeito para alternar a visibilidade do cursor
    useEffect(() => {
      document.body.style.cursor = cursorVisible ? 'auto' : 'none';
    }, [cursorVisible]);

    // O componente WrappedComponent é retornado com props adicionais, se necessário
    return <WrappedComponent {...props} showButton={showButton} />;
  };
}

export default withKeyboardControls;
