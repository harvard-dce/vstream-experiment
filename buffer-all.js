function bufferAll(opts) {
  var video;
  var url;
  var mimeCodec;

  if (opts) {
    video = opts.video;
    url = opts.url;
    mimeCodec = opts.mimeCodec;
  }

  if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
    document.querySelector('#message').textContent = 'Codec is supported.';
    var mediaSource = new MediaSource;
    //console.log(mediaSource.readyState); // closed
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen);
  } else {
    document.querySelector('#message').textContent = 'Codec is NOT supported.';
    console.error('Unsupported MIME type or codec: ', mimeCodec);
  }

  function sourceOpen (_) {
    console.log(this.readyState); // open
    var mediaSource = this;
    var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    fetchAB(url, function (buf) {
      sourceBuffer.addEventListener('updateend', function (_) {
        console.log(mediaSource.readyState);
        // mediaSource.endOfStream();
        video.play();
        //console.log(mediaSource.readyState); // ended
      });
      sourceBuffer.appendBuffer(buf);
    });
  };

  function fetchAB (url, cb) {
    console.log(url);
    var xhr = new XMLHttpRequest;
    xhr.open('get', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      cb(xhr.response);
    };
    xhr.send();
  };
}

module.exports = bufferAll;
