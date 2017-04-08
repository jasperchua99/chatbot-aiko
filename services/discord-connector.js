var Discord = require('discord.io');
var services = require('./service-loader');
var parser = require('./discord-parser');
var registry = include('/services/config/registry.js');
var DirectLineConnector = require('./web/direct-line-connector');

module.exports = function () {
    return {
        socket: new Discord.Client({
            token: (process.env.DISCORD_APP_TOKEN),
            autorun: true
<<<<<<< HEAD
        }),
        subscribe: function () {
            var self = this;
            this.socket.on('message', function (user, userID, channelID, message) {
                var id = self.register(channelID);
                if (id !== null) {
                    var chat = self.parse(user, userID, channelID, message);
                    registry[registry.index[channelID]].socket = {
                        send: self.send,
                        'channelID': channelID,
                        socket: self.socket,
                        disconnect: self.disconnect
                    };
                    self.resolve(chat);
                }
            });
        },
        parse: function (user, userID, channelID, message) {
            return {
                timeStamp: new Date().toUTCString(),
                name: user,
                'userID': userID,
                'text': message,
                'channelID': channelID,
                'id': registry.index[channelID]
            };
        },
        register: function (channelID) {
            if (registry.index[channelID] === undefined) {
                DirectLineConnector.startConversation(channelID);
                return null;
            }
            else return registry.index[channelID];
        },
        resolve: function (chat) {
            var socket = registry[chat.id].socket;
            var res = services(chat);
            if ((res !== null) && (res !== undefined)) {
                if (res.constructor === Array)
                    res.forEach(function (msg) { console.log(msg); socket.send(msg); });
                else
                    socket.send(res);
=======
        });
        this.subscribe();
    },

    subscribe: function () {
        this.socket.on('message', this.multiplex);
    },

    multiplex: function (user, userID, channelID, message) {
        var conversationId = ChannelMap.getConversation({ type: 'discord', id: channelID });
        if (conversationId === null) {
            DirectLineConnector.conversation({ type: 'discord', id: channelID });
        }
        else {
            if (user !== (process.env.DISCORD_BOT_NAME)) {
                var chat = {
                    timeStamp: new Date().toUTCString(),
                    name: user,
                    text: message,
                    'conversationId': conversationId
                };
                var res = Native.match(chat);
                if (res !== null) {
                    if (res.constructor === Array)
                        res.forEach(function (msg) { DiscordConnector.send(channelID, msg);});
                    else
                        DiscordConnector.send(channelID, res);
                };
>>>>>>> 3b61c693067f8666b4ff6bf1417ec34c7be73582
            }
            else if ((chat !== null) && (chat !== undefined)) {
                if (((RegExp('^(' + (process.env.DISCORD_BOT_NAME) + '|<@' + process.env.DISCORD_BOT_ID + '>)[ ,:]', 'i')).test(chat.text))
                    || (RegExp('[ ,](' + (process.env.DISCORD_BOT_NAME) + '|<@' + process.env.DISCORD_BOT_ID + '>)[\?]?$', 'i').test(chat.text))) {
                    var str = chat.text.replace(RegExp('[ ,](' + (process.env.DISCORD_BOT_NAME) + '|<@' + process.env.DISCORD_BOT_ID + '>)[\?]?$', 'i'), "");
                    str = str.replace((RegExp('^(' + (process.env.DISCORD_BOT_NAME) + '|<@' + process.env.DISCORD_BOT_ID + '>)[ ,:]', 'i')), "");
                    str = str.replace(/^ +/, "");
                    str = str.replace(/[, ]+$/, "");
                    console.log(chat);
                    console.log(chat.id);
                    DirectLineConnector.send(chat.id, chat.name, str);
                }
            }
        },
        send: function (message) {
            //console.log(message);
            this.socket.sendMessage({
                'to': this.channelID,
                'message': message
            });
        },
        disconnect: function () {
            this.socket.disconnect();
        }
    }
<<<<<<< HEAD
};
=======
};

module.exports = DiscordConnector;
>>>>>>> 3b61c693067f8666b4ff6bf1417ec34c7be73582
