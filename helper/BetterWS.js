const BetterWS = {
  socket: null,
  intervalcheck: null,
  isBusy: false,
  join() {
    if (this.socket.readyState === this.socket.OPEN && socket.channel?.channel && HelperWASD.current?.user_profile)
      this.socket.send(`42["join",{"streamerId":${socket.channel.channel.user_id}, "userId":${HelperWASD.current?.user_profile?.user_id ? HelperWASD.current?.user_profile?.user_id : 0}}]`);
  },
  leave() {
    if (this.socket.readyState === this.socket.OPEN && socket.channel?.channel && HelperWASD.current?.user_profile)
      this.socket.send(`42["leave",{"streamerId":${socket.channel.channel.user_id}, "userId":${HelperWASD.current?.user_profile?.user_id ? HelperWASD.current?.user_profile?.user_id : 0}}]`);
  },
  start(isAutoJoin) {
    if (BetterWS.isBusy) return;
    BetterWS.isBusy = true;

    this.socket = new WebSocket("wss://betterwasd.herokuapp.com/");
    // this.socket = new WebSocket("ws://localhost:5000/");

    this.socket.onopen = () => {
      if (BetterWS.intervalcheck === null) {
        BetterWS.intervalcheck = setInterval(() => {
          if (BetterWS.socket) {
            try {
              if (BetterWS.socket.readyState === BetterWS.socket.OPEN) BetterWS.socket.send("2");
            } catch (err) {
              console.log(err);
            }
          }
        }, 20000);
      }
      if (isAutoJoin) {
        this.join();
      }
    };

    this.socket.onclose = () => {
      BetterWS.isBusy = false;
      clearInterval(BetterWS.intervalcheck);
      BetterWS.intervalcheck = null;
      setTimeout(() => BetterWS.start(true), 30000);
    };

    this.socket.onmessage = (e) => {
      if (!e || !e.data) return;
      let code = null;
      let JSData;
      if (e.data.indexOf("[") != -1 && e.data.indexOf("[") < e.data.indexOf("{")) {
        code = e.data.slice(0, e.data.indexOf("["));
        data = e.data.slice(e.data.indexOf("["), e.data.length);
        JSData = JSON.parse(data);
      } else if (e.data.indexOf("{") != -1) {
        code = e.data.slice(0, e.data.indexOf("{"));
        data = e.data.slice(e.data.indexOf("{"), e.data.length);
        JSData = JSON.parse(data);
      } else {
        JSData = null;
        code = e.data;
      }

      if (!JSData) return;

      switch (JSData[0]) {
        case "createPaint":
          HelperBWASYA.paints[JSData[1].user_login] = JSData[1].paint.toString();
          break;
        case "updatePaint":
          HelperBWASYA.paints[JSData[1].user_login] = JSData[1].paint.toString();
          break;
        case "deletePaint":
          delete HelperBWASYA.paints[JSData[1].user_login];
          break;

        case "likeEmote":
        case "createEmote":
          if (typeof HelperBWASYA.items.bwasdUsers[JSData[1].user_id] == "undefined") {
            HelperBWASYA.items.bwasdUsers[JSData[1].user_id] = {
              username: socket.channel?.channel?.channel_owner?.user_login,
              lastUpdate: Date.now(),
            };
          }
          if (typeof HelperBWASYA.items.bwasdEmotes[JSData[1].user_id] == "undefined") {
            HelperBWASYA.items.bwasdEmotes[JSData[1].user_id] = {};
          }
          HelperBWASYA.items.bwasdEmotes[JSData[1].user_id][JSData[1].code] = {
            id: JSData[1]._id,
            zeroWidth: !!JSData[1].visibility_simple?.filter((t) => t == "ZERO_WIDTH").length,
          };
          HelperBWASYA.emotes[JSData[1].code] = {
            id: JSData[1]._id,
            zeroWidth: !!JSData[1].visibility_simple?.filter((t) => t == "ZERO_WIDTH").length,
          };
          break;

        case "updateEmote":
          delete HelperBWASYA.items.bwasdEmotes[JSData[1].user_id][JSData[1].oldCode];
          delete HelperBWASYA.emotes[JSData[1].oldCode];

          if (typeof HelperBWASYA.items.bwasdUsers[JSData[1].user_id] == "undefined") {
            HelperBWASYA.items.bwasdUsers[JSData[1].user_id] = {
              username: socket.channel?.channel?.channel_owner?.user_login,
              lastUpdate: Date.now(),
            };
          }
          if (typeof HelperBWASYA.items.bwasdEmotes[JSData[1].user_id] == "undefined") {
            HelperBWASYA.items.bwasdEmotes[JSData[1].user_id] = {};
          }
          HelperBWASYA.items.bwasdEmotes[JSData[1].user_id][JSData[1].code] = {
            id: JSData[1]._id,
            zeroWidth: !!JSData[1].visibility_simple?.filter((t) => t == "ZERO_WIDTH").length,
          };
          HelperBWASYA.emotes[JSData[1].code] = {
            id: JSData[1]._id,
            zeroWidth: !!JSData[1].visibility_simple?.filter((t) => t == "ZERO_WIDTH").length,
          };
          break;

        case "unlikeEmote":
        case "deleteEmote":
          delete HelperBWASYA.items.bwasdEmotes[JSData[1].user_id][JSData[1].code];
          delete HelperBWASYA.emotes[JSData[1].code];
          break;

        case "personalEmote":
          if (!HelperBWASYA.items.bwasdPrivateEmotes[JSData[1].user_login]) HelperBWASYA.items.bwasdPrivateEmotes[JSData[1].user_login] = {};
          HelperBWASYA.items.bwasdPrivateEmotes[JSData[1].user_login][JSData[1].code] = {
            id: JSData[1]._id,
            zeroWidth: !!JSData[1].visibility_simple?.filter((t) => t == "ZERO_WIDTH").length,
          };
          break;
        case "unpersonalEmote":
          delete HelperBWASYA.items.bwasdPrivateEmotes[JSData[1].user_login][JSData[1].code];
          break;
      }
    };

    this.socket.onerror = () => {
      BetterWS.isBusy = false;
      clearInterval(BetterWS.intervalcheck);
      BetterWS.intervalcheck = null;
      setTimeout(() => BetterWS.start(true), 30000);
    };
  },
};
