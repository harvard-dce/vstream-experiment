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
  bunnyTranscode: {
    url: 'data/frag_bunny2.mp4',
    mimeCodec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
  },
  dceExample: {
    url: 'data/presenter_trimmed.mp4',
    mimeCodec: 'video/mp4; codecs="avc1.640028, mp4a.40.2"'
  },
  baseline: {
    url: 'data/baseline3_test.mp4',
    mimeCodec: 'video/mp4; codecs="avc1.42c01E, mp4a.40.2"',
  },
  transcodeA: {
    url: 'data/1min-encoded.mp4',
    mimeCodec: 'video/mp4; codecs="avc1.42c01E, mp4a.40.2"'
  },
  transcode2: {
    url: 'data/presenter_transcode2.mp4',
    mimeCodec: 'video/mp4; codecs="avc1.42C028, mp4a.40.2"'
  },
  bento: {
    url: 'data/ecm-presenter-bento.mp4',
    mimeCodec: 'video/mp4; codecs="avc1.42C01E, mp4a.40.2"'
  },
  bentoBaseline: {
    url: 'data/baseline3_bento.mp4',
    mimeCodec: 'video/mp4; codecs="avc1.42C01E, mp4a.40.2"'
  },
  presentation: {
    url: 'data/presentation_bento.mp4',
    mimeCodec: 'video/mp4; codecs="avc1.42C01E, mp4a.40.2"'
  }
}

var opts = clone(media['presentation']);
opts.video = document.querySelector('#presenter-video');
bufferWhenNeeded(opts);
// bufferAll(opts);
