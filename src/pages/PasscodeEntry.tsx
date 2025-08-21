import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasscodeEntry = () => {
  const [passcode, setPasscode] = useState('');
  const navigate = useNavigate();

  const handleNumberPress = (number: string) => {
    if (passcode.length < 6) {
      const newPasscode = passcode + number;
      setPasscode(newPasscode);
      
      // Auto navigate when 6 digits are entered
      if (newPasscode.length === 6) {
        setTimeout(() => {
          navigate('/main');
        }, 200);
      }
    }
  };

  const handleDelete = () => {
    setPasscode(prev => prev.slice(0, -1));
  };

  const renderDots = () => {
    return Array.from({ length: 6 }, (_, index) => (
      <div
        key={index}
        className={`w-4 h-4 rounded-full border-2 transition-colors duration-200 ${
          index < passcode.length
            ? 'bg-green-500 border-green-500'
            : 'bg-background border-muted-foreground'
        }`}
      />
    ));
  };

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-2xl font-bold">B</span>
            </div>
          </div>
        </div>

        {/* Passcode dots */}
        <div className="flex justify-center space-x-4">
          {renderDots()}
        </div>

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {numbers.slice(0, 9).map((number) => (
            <button
              key={number}
              onClick={() => handleNumberPress(number)}
              className="w-20 h-20 mx-auto border-2 border-muted-foreground hover:border-accent text-foreground rounded-full text-xl font-medium transition-colors duration-200 active:scale-95 transform"
            >
              {number}
            </button>
          ))}
          
          {/* Empty space, 0, Delete */}
          <div></div>
          <button
            onClick={() => handleNumberPress('0')}
            className="w-20 h-20 mx-auto border-2 border-muted-foreground hover:border-accent text-foreground rounded-full text-xl font-medium transition-colors duration-200 active:scale-95 transform"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-20 h-20 mx-auto hover:bg-accent text-foreground text-lg font-medium transition-colors duration-200 active:scale-95 transform flex items-center justify-center"
          >
            ⌫
          </button>
        </div>

        {/* Forgot passcode link */}
        <div className="text-center mt-6">
          <button className="text-green-600 underline text-sm">
            ลืมรหัสผ่าน
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasscodeEntry;