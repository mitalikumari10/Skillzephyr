import React from 'react';
import { useLocation } from 'react-router-dom';

const VideoPlayer = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const videoUrl = query.get('url');

    return (
        <div>
            <h1>Video Player</h1>
            {videoUrl ? (
                <video controls width="800">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>No video available</p>
            )}
        </div>
    );
};

export default VideoPlayer;
