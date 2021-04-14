<template>
  <div>
    <template>
          <div class="bx--grid bx--grid--default bx--grid--no-gutter tell-me-content">
            <div class="bx--row">
              <div class="bx--col r1-col">
                <div class="pagetitle">Tell My Story</div>
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--col r2-col">
                <div class="videoRec text-xs-center ">
                  <input type="hidden" ref="video_h" name="video" v-model="videoModel" />
                  <div class="border" v-if="displayVueWebCam">
                        <vue-web-cam
                            ref="webcam"
                            :device-id="deviceId"
                            width="100%"
                            @started="onStarted"
                            @stopped="onStopped"
                            @error="onError"
                            @cameras="onCameras"
                            @camera-change="onCameraChange"
                        />
                    </div>
                  <video ref="video" v-else
                  class="video" :poster="poster" controls></video>
                  <div class="video-controllers"></div>
                  <!-- <button @click="startRecording('video1')">Record</button> -->
                  <!-- <button @click="stopRecording('video1')">Stop</button> -->
                </div>
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--col r3-col">
                <cv-grid class="video-control-panel">
                  <cv-row class="grid-row">
                    <cv-column class="col-1">
                        <div>Full Detail</div>
                    </cv-column>
                    <cv-column class="col-2">
                        <div class="btn-blur">Blur</div>
                    </cv-column>
                    <cv-column class="col-3">
                        <div>Audio Only</div>
                    </cv-column>
                  </cv-row>
                  <cv-row class="grid-row">
                    <cv-column class="col-1">
                      Lulu Blake
                      <br/>10-15-2020
                    </cv-column>
                    <cv-column class="col-2">
                      <div v-if="showRecordStart">
                        <RecordingFilledAlt32
                        @click="startRecording('video1')" class="btn-record-start"/>
                        <!-- <br/>Record -->
                      </div>
                      <div v-if="showRecordStop">
                        <StopFilledAlt32
                        @click="stopRecording('video1')" class="btn-rcord-stop"/>
                        <!-- <br/>Stop -->
                      </div>
                    </cv-column>
                    <cv-column class="col-3 video-length">
                      02.00m
                    </cv-column>
                  </cv-row>
                </cv-grid>
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--col r4-col bx--btn--secondary">
                <div class="btn">Cancel</div>
              </div>
              <div class="bx--col r4-col bx--btn--primary">
                <div class="btn">Share</div>
              </div>
            </div>
          </div>
    </template>
  </div>
</template>

<script>
import RecordingFilledAlt32 from "@carbon/icons-vue/lib/recording--filled--alt/32";
import StopFilledAlt32 from "@carbon/icons-vue/lib/stop--filled--alt/32";
/*eslint-disable */
const RecordRTC = require("recordrtc");
import { WebCam } from "vue-web-cam";

export default {
  name: "Record",
  data() {
    return {
      poster: "/static/video-camera.png",
      videoModel: "",
      showRecordStart: true,
      showRecordStop: false,
      displayVueWebCam: false,
      img: null,
      camera: null,
      deviceId: null,
      devices: []
    };
  },
  computed: {
    videotitle(){ 
      const policydata =this.$store.getters["policystore/getCurrentPolicy"];      
      return policydata.title;
    },
    device: function() {
      return this.devices.find(n => n.deviceId === this.deviceId);
    }
  },
  watch: {
    camera: function(id) {
      this.deviceId = id;
    },
    devices: function() {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    }
  },
  components: {
    RecordingFilledAlt32,
    StopFilledAlt32,
    "vue-web-cam": WebCam
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
      this.showRecordStop = true;
      this.showRecordStart = false;
      this.displayVueWebCam = true;
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
      this.showRecordStop = false;
      this.showRecordStart = true;
      this.displayVueWebCam = false;
    },
    download(video = "video") {
      this.recordRTC.save("video.webm");
    },
    onCapture() {
      this.img = this.$refs.webcam.capture();
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    }
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

<style  lang="scss" scoped>
@import '@/styles/carbon-overrides';
.tell-me-content{  
  background-color: $ui-05;
  padding: 0;
  margin: 0;
  .r1{   
    &-col{ 
      background-color: $ui-01;  
      .pagetitle{
        text-align: center;
        font-size: 1rem;
        padding: $spacing-05 $spacing-05;
      }
    }
  }
  .r2{
    &-col{
      text-align: center;
      background-color: $ui-05;      
      video {
        //filter: blur(4px) invert(1) opacity(0.5);
        max-width: 100%;
        width: 90vw;
        height: 70vh
      }
    }   
  }
  .r3{   
    &-col{ 
      background-color: $ui-05;
      .video-control-panel{      
        width: 100%;
        color: white; 
        padding: 0;      
        margin: 0;
        .grid-row{
          padding: $spacing-03 $spacing-05 $spacing-05 $spacing-05;
          .col{   
            cursor: pointer;
            &-1{                                 
              text-align: left;
            }
            &-2{                                 
              text-align: center;
              .btn-blur{  
                color: $color-yellow;
              }
              .btn-record-start, .btn-rcord-stop{                
                text-align: center;  
                cursor: pointer;
              }
            }
            &-3{                                 
              text-align: right;
            }            
          }
        }
      }  
    } 
  }
  .r4{
    &-col{         
      cursor: pointer;
      .btn {
        padding: $spacing-05 $spacing-05;
      }
    }
  }
}
</style>
