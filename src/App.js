import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createApi } from 'unsplash-js';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import './App.css';

const unsplash = createApi({
  accessKey: 'itqlXJ7k8Jul8FxxFF129bzpKdmpdOOsZ9-cGwV-d20', 
});

const App = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const fetchRandomImage = async () => {
    try {
      const response = await unsplash.photos.getRandom({ count: 1 });
      const imageUrl = response.response?.[0]?.urls?.regular;
      setImage(imageUrl);
    } catch (error) {
      console.error('Error fetching random image:', error);
    }
  };

  const handleRefresh = () => {
    fetchRandomImage();
  };

  const handleShare = () => {
    const shareURL = window.location.href;
    const shareText = 'Check out this random image!';

    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`;
    const twitterURL = `https://twitter.com/share?url=${encodeURIComponent(shareURL)}&text=${encodeURIComponent(
      shareText
    )}`;
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareText
    )}%20${encodeURIComponent(shareURL)}`;

    window.open(facebookURL, '_blank');
    window.open(twitterURL, '_blank');
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="app">
      {image && (
        <div className="image-container">
          <img src={image} alt="Random" />
        </div>
      )}
      {image && (
        <div className="share-buttons">
          <FacebookShareButton url={window.location.href}>
            <button>Share on Facebook</button>
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href} title="Check out this random image!">
            <button>Share on Twitter</button>
          </TwitterShareButton>
          <WhatsappShareButton url={window.location.href} title="Check out this random image!">
            <button>Share on WhatsApp</button>
          </WhatsappShareButton>
        </div>
      )}
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default App;
