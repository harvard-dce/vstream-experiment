// Adapter from https://github.com/nickdesaulniers/netfix/blob/gh-pages/demo/bufferAll.html.

var video = document.querySelector('#presenter-video');

var assetURL = 'data/presenter_trimmed.mp4';
// Need to be specific for Blink regarding codecs
// ./mp4info frag_bunny.mp4 | grep Codec
var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
debugger;
if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
  var mediaSource = new MediaSource;
  video.src = URL.createObjectURL(mediaSource);
  mediaSource.addEventListener('sourceopen', sourceOpen);
}
else {
  console.error('Unsupported MIME type or codec: ', mimeCodec);
}

function sourceOpen() {
  //console.log(this.readyState); // open
  var mediaSource = this;
  var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  fetchAB(assetURL, function (buf) {
    sourceBuffer.addEventListener('updateend', respondToStreamEnd);
    sourceBuffer.appendBuffer(buf);
  });
}

function respondToStreamEnd() {
  mediaSource.endOfStream();
  video.play();
  //console.log(mediaSource.readyState); // ended
}

function fetchAB(url, cb) {
  console.log(url);
  var xhr = new XMLHttpRequest;
  xhr.open('get', url);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    cb(xhr.response);
  };
  xhr.send();
};
