
const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');

const app = express();

app.use(express.json());

app.post('/download', async (req, res) => {
  const { url } = req.body;
  const videoID = ytdl.getVideoID(url);
  const downloadPath =await `downloads/${videoID}.mp4`;

  try {
    const video = ytdl(url, { filter: 'videoandaudio' });

    video.pipe(fs.createWriteStream(downloadPath));

    video.on('end', () => {
      console.log(`Video downloaded: ${url}`);
      res.download(downloadPath, `${videoID}.mp4`, (error) => {
        if (error) {
          console.error(`Error: ${error}`);
          res.status(500).json({ error: 'An error occurred while downloading the video.' });
        } else {
          fs.unlink(downloadPath, (unlinkError) => {
            if (unlinkError) {
              console.error(`Error deleting file: ${unlinkError}`);
            }
          });
        }
      });
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: 'An error occurred while downloading the video.' });
  }
});
  

module.exports=app;