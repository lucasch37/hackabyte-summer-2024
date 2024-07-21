import React from 'react';

interface LikeDislikeButtonsProps {
    videoId: string;
}

const LikeDislikeButtons: React.FC<LikeDislikeButtonsProps> = ({ videoId }) => {
    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:5000/videos/like`, {
                method: 'POST',
                body: JSON.stringify({ videoId }),
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDislike = async () => {
        try {
            const response = await fetch(`http://localhost:5000/videos/dislike`, {
                method: 'POST',
                body: JSON.stringify({ videoId }),
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLike}>Like</button>
            <button onClick={handleDislike}>Dislike</button>
        </div>
    );
};

export default LikeDislikeButtons;
