import http from 'http';
import fs from 'fs';
import path from 'path';

// Define the port number
const PORT = 5000;

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    handleFileUpload(req, res);
  } else if (req.method === 'GET' && req.url === '/videos') {
    listVideos(res);
  } else if (req.method === 'POST' && req.url?.startsWith('/videos/like')) {
    handleLikeDislike(req, res, true);
  } else if (req.method === 'POST' && req.url?.startsWith('/videos/dislike')) {
    handleLikeDislike(req, res, false);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

// Handle file upload
const handleFileUpload = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const contentType = req.headers['content-type'];
  const boundary = contentType?.split('boundary=')[1];

  if (!boundary) {
    res.statusCode = 400;
    res.end('No boundary specified');
    return;
  }

  let data = '';
  req.on('data', chunk => data += chunk);
  req.on('end', () => {
    const boundaryString = `--${boundary}`;
    const endBoundaryString = `--${boundary}--`;

    const startIndex = data.indexOf(boundaryString) + boundaryString.length;
    const endIndex = data.indexOf(endBoundaryString);
    if (startIndex === -1 || endIndex === -1) {
      res.statusCode = 400;
      res.end('Failed to parse file data');
      return;
    }

    const fileData = data.substring(startIndex, endIndex).trim();

    // Clean up file data to get rid of boundary content
    const fileContentStart = fileData.indexOf('\r\n\r\n') + 4;
    const fileContent = fileData.substring(fileContentStart);

    const filePath = path.join(__dirname, 'uploads', 'uploadedFile');
    fs.writeFile(filePath, fileContent, 'binary', err => {
      if (err) {
        res.statusCode = 500;
        res.end('Failed to save file');
        return;
      }
      res.statusCode = 200;
      res.end('File uploaded successfully');
    });
  });
};

// List uploaded videos (dummy data)
const listVideos = (res: http.ServerResponse) => {
  const videos = [
    { id: '1', url: '/uploads/uploadedFile', likes: 0, dislikes: 0 }
  ];
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(videos));
};

// Handle like/dislike
const handleLikeDislike = (req: http.IncomingMessage, res: http.ServerResponse, isLike: boolean) => {
  // Dummy implementation
  res.statusCode = 200;
  res.end(isLike ? 'Video liked' : 'Video disliked');
};

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
