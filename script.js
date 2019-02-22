// var Buffer = require('buffer').Buffer;
var zlib = require('zlib');
const fs = require("fs");

// var input = new Buffer('lorem ipsum dolor sit amet');
// console.log(input)
let clientSettings = fs.readFileSync("./ClientSettings.Sav");
clientSettings = clientSettings.slice(16, clientSettings.length)
// console.log(clientSettings)
var output = zlib.inflateSync(clientSettings);
console.log(output.toString())


// /*
// *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
// *
// *  Use of this source code is governed by a BSD-style license
// *  that can be found in the LICENSE file in the root of the source
// *  tree.
// */
//
// // This code is adapted from
// // https://rawgit.com/Miguelao/demos/master/mediarecorder.html
//
// 'use strict';
//
// /* globals MediaRecorder */
// const {ipcRenderer} = require("electron");
//
// function saveBlob(blob) {
//   let reader = new FileReader()
//   const fileName = "test";
//   reader.onload = function() {
//     if (reader.readyState == 2) {
//       var buffer = new Buffer(reader.result)
//       ipcRenderer.send("SAVE_FILE_EVENT", fileName, buffer)
//       console.log(`Saving ${JSON.stringify({ fileName, size: blob.size })}`)
//     }
//   }
//   reader.readAsArrayBuffer(blob)
// }
//
// ipcRenderer.on("SAVED_FILE_EVENT", (event, path) => {
//     console.log("Saved file " + path)
// })
//
// const mediaSource = new MediaSource();
// mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
// let mediaRecorder;
// let recordedBlobs;
// let sourceBuffer;
//
// const errorMsgElement = document.querySelector('span#errorMsg');
// const recordedVideo = document.querySelector('video#recorded');
// const recordButton = document.querySelector('button#record');
// recordButton.addEventListener('click', () => {
//   if (recordButton.textContent === 'Start Recording') {
//     startRecording();
//   } else {
//     stopRecording();
//     recordButton.textContent = 'Start Recording';
//     playButton.disabled = false;
//     downloadButton.disabled = false;
//   }
// });
//
// const playButton = document.querySelector('button#play');
// playButton.addEventListener('click', () => {
//   const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
//   recordedVideo.src = null;
//   recordedVideo.srcObject = null;
//   recordedVideo.src = window.URL.createObjectURL(superBuffer);
//   recordedVideo.controls = true;
//   recordedVideo.play();
// });
//
// const downloadButton = document.querySelector('button#download');
// downloadButton.addEventListener('click', () => {
//   const blob = new Blob(recordedBlobs, {type: 'video/webm'});
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.style.display = 'none';
//   a.href = url;
//   a.download = 'test.webm';
//   document.body.appendChild(a);
//   a.click();
//   setTimeout(() => {
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   }, 100);
// });
//
// function handleSourceOpen(event) {
//   console.log('MediaSource opened');
//   sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
//   console.log('Source buffer: ', sourceBuffer);
// }
//
// function handleDataAvailable(event) {
//   if (event.data && event.data.size > 0) {
//     const blob = new Blob([event.data], {type: 'video/webm'});
//     saveBlob(blob);
//     // recordedBlobs.push(event.data);
//   }
// }
//
// function startRecording() {
//   recordedBlobs = [];
//   // let options = {mimeType: 'video/mp4'}
//   let options = {mimeType: 'video/webm;codecs=vp8', videoBitsPerSecond: 2000*1024};
//   // if (!MediaRecorder.isTypeSupported(options.mimeType)) {
//   //   console.error(`${options.mimeType} is not Supported`);
//   //   errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
//   //   options = {mimeType: 'video/webm;codecs=vp8'};
//   //   if (!MediaRecorder.isTypeSupported(options.mimeType)) {
//   //     console.error(`${options.mimeType} is not Supported`);
//   //     errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
//   //     options = {mimeType: 'video/webm'};
//   //     if (!MediaRecorder.isTypeSupported(options.mimeType)) {
//   //       console.error(`${options.mimeType} is not Supported`);
//   //       errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
//   //       options = {mimeType: ''};
//   //     }
//   //   }
//   // }
//
//   try {
//     mediaRecorder = new MediaRecorder(window.stream, options);
//   } catch (e) {
//     console.error('Exception while creating MediaRecorder:', e);
//     errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
//     return;
//   }
//
//   console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
//   recordButton.textContent = 'Stop Recording';
//   playButton.disabled = true;
//   downloadButton.disabled = true;
//   mediaRecorder.onstop = (event) => {
//     console.log('Recorder stopped: ', event);
//   };
//   mediaRecorder.ondataavailable = handleDataAvailable;
//   mediaRecorder.start(60000); // collect 10ms of data
//   console.log('MediaRecorder started', mediaRecorder);
// }
//
// function stopRecording() {
//   mediaRecorder.stop();
//   console.log('Recorded Blobs: ', recordedBlobs);
// }
//
// function handleSuccess(stream) {
//   recordButton.disabled = false;
//   console.log('getUserMedia() got stream:', stream);
//   window.stream = stream;
//
//   const gumVideo = document.querySelector('video#gum');
//   gumVideo.srcObject = stream;
// }
//
// async function init(stream) {
//   try {
//     handleSuccess(stream);
//   } catch (e) {
//     console.error('navigator.getUserMedia error:', e);
//     errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
//   }
// }
//
// document.querySelector('button#start').addEventListener('click', async () => {
//   const deviceInfos = await navigator.mediaDevices.enumerateDevices();
//   let nanoVideoCapturerID = null;
//   for (let i = 0; i < deviceInfos.length; i++) {
//     const device = deviceInfos[i];
//     if (device.label === "VisorGameCapture1") {
//       nanoVideoCapturerID = device.deviceId;
//       break;
//     }
//   }
//
//   const constraints = {
//     audio: false,
//     video: {
//       width: 1280,
//       height: 720,
//       deviceId: {exact: nanoVideoCapturerID},
//     },
//   };
//   console.log('Using media constraints:', constraints);
//   const stream = await navigator.mediaDevices.getUserMedia(constraints);
//
//   const stream2 = await navigator.mediaDevices.getUserMedia({
//     audio: {mandatory: {chromeMediaSource: "desktop", chromeMediaSourceId: "screen:0:0"}}, // Default monitor
//     video: {mandatory: {chromeMediaSource: "desktop", chromeMediaSourceId: "screen:0:6"}}, // Dummy monitor
//   });
//   const audioTracks = stream2.getAudioTracks();
//   for (let i = 0; i < audioTracks.length; i++) {
//     stream.addTrack(audioTracks[i]);
//   }
//
//   await init(stream);
// });
