import React, { useEffect, useState } from 'react';

interface Video {
    id: string;
    url: string;
    likes: number;
    dislikes: number;
}

const ListVideos: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://localhost:5000/videos');
                const result = await response.json();
                setVideos(result);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div>
            {videos.map(video => (
                <div key={video.id}>
                    <video src={video.url} controls width="320" height="240" />
                    <p>Likes: {video.likes} | Dislikes: {video.dislikes}</p>
                </div>
            ))}
        </div>
    );
};

export default ListVideos;
