import React from 'react';
import './ImageUploader.css';

// Fonction qui sert a upload
function ImageUploader(props) {
    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                props.onImageUpload(type, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleColorChange = (type, color) => {
        props.onColorChange(type, color);
    };

    return (
        <div className="uploader">
            <div className="upload-section">
                <div className="column">
                <label>Background:</label>
                </div>
                <div className="column">
                <input type="file" onChange={(e) => handleImageChange(e, 'background')} />
                </div>
                <div className="column">
                <input type="color" onChange={(e) => handleColorChange('background', e.target.value)} />
                </div>
            </div>
    
            <div className="upload-section">
            <div className="column">
                <label>Skin:</label>
                </div>
                <div className="column">
                <input type="file" onChange={(e) => handleImageChange(e, 'skin')} />
                </div>
                <div className="column">
                <input type="color" onChange={(e) => handleColorChange('skin', e.target.value)} />
                </div>
            </div>
    
            <div className="upload-section">
                <div className="column">
                <label>Outline:</label>
                </div>
                <div className="column">
                <input type="file" onChange={(e) => handleImageChange(e, 'outline')} />
                </div>
                <div className="column">
                <input type="color" onChange={(e) => handleColorChange('outline', e.target.value)} />
                </div>
            </div>
            </div>
    );
    
}

export default ImageUploader;
