var bufferWhenNeeded = require('./buffer-when-needed');
var bufferAll = require('./buffer-all');
var clone = require('lodash.clone');

// Need to be specific for Blink regarding codecs
// ./mp4info frag_bunny.mp4 | grep Codec
// var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

var media = {
  definitelyWorks: {
    url: 'data/frag_bunny.mp4',
    mimeCodec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
  },
  dceExample: {
    url: 'data/presenter_trimmed.mp4',
    mimeCodec: 'video/mp4; codecs="avc1.640028, mp4a.40.2"'
  },
  baseline: {
    url: 'data/baseline3_test.mp4',
    mimeCodec: 'video/mp4; codecs="avc1.42c01E, mp4a.40.2"'
  }
}

var opts = clone(media['definitelyWorks']);
opts.video = document.querySelector('#presenter-video');
// bufferWhenNeeded(opts);
bufferAll(opts);
