import React from 'react';
import VideoUpload from './VideoUpload';
import VideoList from './VideoList';

const App: React.FC = () => {
    return (
        <div>
            <h1>Video Upload and Management</h1>
            <VideoList />
            <VideoList />
        </div>
    );
};

export default App;
