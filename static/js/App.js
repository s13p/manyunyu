import React, { useState } from 'react';
import SVGDisplay from './SVGDisplay';
import ImageUploader from './ImageUploader';

import './App.css';

function App() {

    const [backgroundUseColor, setBackgroundUseColor] = useState(false);
    const [skinUseColor, setSkinUseColor] = useState(false);
    const [outlineUseColor, setOutlineUseColor] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("black");
    const [skinColor, setSkinColor] = useState("black");
    const [outlineColor, setOutlineColor] = useState("white");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [skinImage, setSkinImage] = useState("");
    const [outlineImage, setOutlineImage] = useState("");

    const handleImageUpload = (type, dataUrl) => {
        if (type === 'background') {
            setBackgroundImage(dataUrl);
            setBackgroundUseColor(false);  // Reset to false
        }
        else if (type === 'skin') {
            setSkinImage(dataUrl);
            setSkinUseColor(false);  // Reset to false
        }
        else if (type === 'outline') {
            setOutlineImage(dataUrl);
            setOutlineUseColor(false);  // Reset to false
        }
    };
    
    const handleColorChange = (type, color) => {
        const colorSetters = {
            background: [setBackgroundColor, setBackgroundUseColor],
            skin: [setSkinColor, setSkinUseColor],
            outline: [setOutlineColor, setOutlineUseColor],
        };
    
        if (colorSetters[type]) {
            const [setColor, setUseColor] = colorSetters[type];
            setColor(color);
            setUseColor(true);
        }
    };
    
    function downloadAsPNG() {
        const svgContainer = document.querySelector('.svg-container');
        const svgElement = svgContainer.querySelector('svg');
    
        const svgWidth = 500;
        const svgHeight = 500;
    
        // Serialize the SVG to string
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
    
        // Create an Image object
        const img = new Image();
    
        // Use a promise to wait for the image to load
        const imageLoadPromise = new Promise((resolve) => {
            img.onload = resolve;
        });
    
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
    
        imageLoadPromise.then(() => {
            // Once the image has loaded, draw it to the canvas
            const canvas = document.createElement('canvas');
            canvas.width = svgWidth;
            canvas.height = svgHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
    
            // Download the PNG
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'gamer.png';
            link.click();
        });
    }
    
    

  return (
    <div className="App">
        <SVGDisplay 
    backgroundImage={backgroundImage} 
    skinImage={skinImage} 
    outlineImage={outlineImage} 
    backgroundUseColor={backgroundUseColor}
    backgroundColor={backgroundColor}
    skinUseColor={skinUseColor}
    skinColor={skinColor}
    outlineUseColor={outlineUseColor}
    outlineColor={outlineColor}
/>
        <ImageUploader onImageUpload={handleImageUpload} onColorChange={handleColorChange} />
        <button onClick={downloadAsPNG}>Download PNG</button>
    </div>
);
}

export default App;
