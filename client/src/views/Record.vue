<template>
  <div>
    <div class="pagetitle">Tell My Story</div>
    <div class="videoRec text-xs-center">
      <input type="hidden" ref="video_h" name="video" v-model="videoModel" />
      <video ref="video" class="video" :poster="poster" controls></video>
      <div class="video-controllers"></div>
      <button @click="startRecording('video1')">Record</button>
      <button @click="stopRecording('video1')">Stop</button>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
const RecordRTC = require("recordrtc");

export default {
  data() {
    return {
      poster: "/static/video-camera.png",
      videoModel: "",
    };
  },
  computed: {
    videotitle(){ return 'H.R. 3695'}
  },
  methods: {
    successCallback(stream) {
      const options = {
        mimeType: "video/webm;codecs=vp9",
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 128000,
        timeSlice: 2000,
        bitsPerSecond: 128000,
      };
      this.stream = stream;
      this.recordRTC = RecordRTC(stream, options);
      this.recordRTC.startRecording();
      const video = this.$refs.video;
      video.src = window.URL.createObjectURL(stream);
    },
    errorCallback() {
      // handle error here
    },
    processVideo(audioVideoWebMURL) {
      const video = this.$refs.video;
      const recordRTC = this.recordRTC;
      video.src = audioVideoWebMURL;
      const recordedBlob = recordRTC.getBlob();
      recordRTC.getDataURL(function (dataURL) {});
    },
    startRecording(video = "video") {
      this.poster = "";
      const mediaConstraints = {
        video: {
          mandatory: {
            maxWidth: 400,
            maxHeight: 720,
          },
        },
        audio: true,
      };
      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.successCallback.bind(this), this.errorCallback.bind(this));
    },
    stopRecording(video = "video") {
      this.poster = "";
      const recordRTC = this.recordRTC;
      recordRTC.stopRecording(this.processVideo.bind(this));
      const stream = this.stream;
      stream.getAudioTracks().forEach((track) => track.stop());
      stream.getVideoTracks().forEach((track) => track.stop());
    },
    download(video = "video") {
      this.recordRTC.save("video.webm");
    },
  },
  mounted() {
    this.$store.dispatch("appsettingstore/updateAppSettings", {
      apptitle: this.videotitle,
      topbar: {
        hasBack: true,
        hasSettings: false,
      },
    });
    const video = this.$refs.video;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  },
};
</script>

<style>
video {
    width: 100%;
    height: 100vh;
}
.pagetitle{
  text-align: center;
  font-size: 1rem;
}
</style>
