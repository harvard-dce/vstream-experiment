test:
	node tests/basictests.js

run:
	wzrd index.js -- \
		-d

pushall:
	git push origin master && git push origin gh-pages

# Transcode the video to "avc1.42c00d,mp4a.40.2"
# Goal: avc1.42E01E, mp4a.40.2
# profile:v baseline => 42
# -level:v 3.0 => 1E
transcode-sample:
	ffmpeg \
		-i data/1min_presenter.mp4 \
		-c:v libx264 \
		-c:a libvo_aacenc \
		-profile:v baseline \
		-level:v 3.0 \
		-r 25 \
		-keyint_min 250 \
		-strict experimental \
		-b:a 96k \
		-movflags faststart \
		data/1min-encoded.mp4

check-sample:
	mp4file --dump data/1min-encoded.mp4 | grep AVCProfileIndication # Profile indication
	mp4file --dump data/1min-encoded.mp4 | grep profile_compatibility # Profile compatibility
	mp4file --dump data/1min-encoded.mp4 | grep AVCLevelIndication # Level indication
