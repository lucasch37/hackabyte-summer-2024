"use client"

import { useState, useEffect } from 'react';

// Define the URL of your backend API
const API_URL = 'http://localhost:5000';

const Page = () => {
    const [file, setFile] = useState<File | null>(null);
    const [videos, setVideos] = useState<{ id: string; url: string; likes: number; dislikes: number }[]>([]);

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            alert('File uploaded successfully');
            fetchVideos(); // Refresh video list after upload
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        }
    };

    // Fetch video list from backend
    const fetchVideos = async () => {
        try {
            const response = await fetch(`${API_URL}/videos`);
            if (!response.ok) {
                throw new Error('Failed to fetch videos');
            }
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    // Like a video
    const handleLike = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/videos/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to like video');
            }

            fetchVideos(); // Refresh video list after like
        } catch (error) {
            console.error('Error liking video:', error);
        }
    };

    // Dislike a video
    const handleDislike = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/videos/dislike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to dislike video');
            }

            fetchVideos(); // Refresh video list after dislike
        } catch (error) {
            console.error('Error disliking video:', error);
        }
    };

    // Fetch videos when component mounts
    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className="flex flex-col flex-1">
            <h1>Video Upload and List</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            <h2>Uploaded Videos</h2>
            <ul>
                {videos.map(video => (
                    <li key={video.id}>
                        <a href={video.url} target="_blank" rel="noopener noreferrer">Video {video.id}</a>
                        <button onClick={() => handleLike(video.id)}>Like ({video.likes})</button>
                        <button onClick={() => handleDislike(video.id)}>Dislike ({video.dislikes})</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;
