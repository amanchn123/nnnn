"use strict";

var express = require('express');

var ytdl = require('ytdl-core');

var fs = require('fs');

var app = express();
app.use(express.json());
app.post('/download', function _callee(req, res) {
  var url, videoID, downloadPath, video;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = req.body.url;
          videoID = ytdl.getVideoID(url);
          _context.next = 4;
          return regeneratorRuntime.awrap("downloads/".concat(videoID, ".mp4"));

        case 4:
          downloadPath = _context.sent;

          try {
            video = ytdl(url, {
              filter: 'videoandaudio'
            });
            video.pipe(fs.createWriteStream(downloadPath));
            video.on('end', function () {
              console.log("Video downloaded: ".concat(url));
              res.download(downloadPath, "".concat(videoID, ".mp4"), function (error) {
                if (error) {
                  console.error("Error: ".concat(error));
                  res.status(500).json({
                    error: 'An error occurred while downloading the video.'
                  });
                } else {
                  fs.unlink(downloadPath, function (unlinkError) {
                    if (unlinkError) {
                      console.error("Error deleting file: ".concat(unlinkError));
                    }
                  });
                }
              });
            });
          } catch (error) {
            console.error("Error: ".concat(error));
            res.status(500).json({
              error: 'An error occurred while downloading the video.'
            });
          }

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = app;