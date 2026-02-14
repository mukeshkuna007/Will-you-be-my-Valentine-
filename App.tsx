
import React, { useState } from 'react';

type Position = {
  top: number;
  left: number;
};

const App: React.FC = () => {
  const [isYesClicked, setIsYesClicked] = useState<boolean>(false);
  const [noCount, setNoCount] = useState<number>(0);
  const [noButtonPosition, setNoButtonPosition] = useState<Position | null>(null);

  const noPhrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Please don't",
    "I'll be very sad",
    "Pookie please",
    "Don't do this to me",
    "I'm gonna cry...",
    "You're breaking my heart ;(",
  ];

  const yesButtonBaseSize = 16;
  const yesButtonGrowth = noCount * 4;
  const yesButtonFontSize = yesButtonBaseSize + yesButtonGrowth;
  const yesButtonPaddingY = 12 + noCount * 2;
  const yesButtonPaddingX = 24 + noCount * 4;

  const handleYesClick = () => {
    setIsYesClicked(true);
  };

  const handleNoAction = () => {
    setNoCount((prev) => prev + 1);

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    // Approximate button size to avoid it going off-screen
    const buttonWidth = 150; 
    const buttonHeight = 50;

    const newLeft = Math.floor(Math.random() * (vw - buttonWidth));
    const newTop = Math.floor(Math.random() * (vh - buttonHeight));

    setNoButtonPosition({ top: newTop, left: newLeft });
  };
  
  const getNoButtonText = () => {
    return noPhrases[Math.min(noCount, noPhrases.length - 1)];
  };

  const noButtonStyle: React.CSSProperties = noButtonPosition 
    ? {
        position: 'absolute',
        top: `${noButtonPosition.top}px`,
        left: `${noButtonPosition.left}px`,
        transition: 'top 0.3s ease, left 0.3s ease',
      } 
    : { transition: 'top 0.3s ease, left 0.3s ease' };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4 text-center overflow-hidden">
      {isYesClicked ? (
        <>
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="Bears kissing" className="h-48 mx-auto" />
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mt-4">
            YAYY!! See you on the 14th!
          </h1>
        </>
      ) : (
        <>
          <img src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif" alt="Bear with roses" className="h-48 mx-auto" />
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 my-6">
            Will you be my Valentine?
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out order-1"
              style={{ fontSize: `${yesButtonFontSize}px`, padding: `${yesButtonPaddingY}px ${yesButtonPaddingX}px` }}
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg order-2"
              style={noButtonStyle}
              onMouseEnter={handleNoAction}
              onClick={handleNoAction} 
            >
              {getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
