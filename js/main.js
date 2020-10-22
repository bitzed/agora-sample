const logMessage = document.getElementById("logMessage");

// rtc object
var rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {}
  };
  
  // Options for joining a channel
  var option = {
    appID: "08698a0b7c234cb6bf6fea41f05cfa93",
    channel: "sample20201022",
    uid: null,
    token: null
  };

function initialize() {
// Create a client
    rtc.client = AgoraRTC.createClient({mode: "rtc", codec: "h264"});

// Initialize the client
    rtc.client.init(option.appID, function () {
    console.log("init success");
    logMessage.innerHTML = "初期化成功";
    }, (err) => {
    console.error(err);
    });
};

function join() {
// Join a channel
    rtc.client.join(option.token, option.channel, option.uid, function (uid) {
        console.log("join channel: " + option.channel + " success, uid: " + uid);
        rtc.params.uid = uid;
        }, function(err) {
        console.error("client join failed", err);
    });
};

function leave() {
// Leave the channel
    rtc.client.leave(function () {
        // Stop playing the local stream
        rtc.localStream.stop();
        // Close the local stream
        rtc.localStream.close();
        // Stop playing the remote streams and remove the views
        while (rtc.remoteStreams.length > 0) {
        var stream = rtc.remoteStreams.shift();
        var id = stream.getId();
        stream.stop();
        removeView(id);
        }
        console.log("client leaves channel success");
    }, function (err) {
        console.log("channel leave failed");
        console.error(err);
    });
}