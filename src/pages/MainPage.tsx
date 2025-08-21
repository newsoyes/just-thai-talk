import React, { useState } from 'react';

const MainPage = () => {
  const [imageState, setImageState] = useState(0); // 0: first image, 1: second image, 2: camera

  const handleImageClick = () => {
    setImageState(prev => (prev + 1) % 3);
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      // Create video element to show camera
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      // For now, just show an alert. You can implement a proper camera UI later
      alert('Camera opened! (Camera functionality ready - implement full UI as needed)');
      
      // Stop the stream after showing
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
      }, 3000);
    } catch (error) {
      alert('Camera access denied or not available');
    }
  };

  const renderContent = () => {
    switch (imageState) {
      case 0:
        return (
          <div
            onClick={handleImageClick}
            className="w-full h-96 bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-accent transition-colors duration-200"
          >
            <div className="text-center text-muted-foreground">
              <div className="text-4xl mb-2">🖼️</div>
              <p>Main Image 1</p>
              <p className="text-sm">(Click to switch to image 2)</p>
            </div>
          </div>
        );
      case 1:
        return (
          <div
            onClick={handleImageClick}
            className="w-full h-96 bg-secondary rounded-lg flex items-center justify-center cursor-pointer hover:bg-accent transition-colors duration-200"
          >
            <div className="text-center text-foreground">
              <div className="text-4xl mb-2">🖼️</div>
              <p>Main Image 2</p>
              <p className="text-sm">(Click to open camera)</p>
            </div>
          </div>
        );
      case 2:
        openCamera();
        setImageState(0); // Reset to first image after camera
        return (
          <div className="w-full h-96 bg-primary/10 rounded-lg flex items-center justify-center">
            <div className="text-center text-foreground">
              <div className="text-4xl mb-2">📸</div>
              <p>Opening Camera...</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Banking App</h1>
          <p className="text-muted-foreground">Main Dashboard</p>
        </header>

        <div className="space-y-4">
          {renderContent()}
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Tap count: {imageState + 1}</p>
            <p>Next: {imageState === 0 ? 'Image 2' : imageState === 1 ? 'Camera' : 'Image 1'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;