/* global $, io */
(function() {
    'use strict';

    const socket = io();

    let user;

    const messageInput = $('#messageInput');
    const loginForm = $('#loginForm');
    const messagesContainer = $('#messagesContainer');
    const messageElem = $('#messages');
    const messageForm = $('#messageForm');
    const currentlyTyping = $('#currentlyTyping');

    const typers = {};

    loginForm.submit(e => {
        e.preventDefault();

        socket.emit('login', $('#name').val(), callbackData => {
            if (callbackData) {
                return $('#loginError').text(callbackData);
            }

            loginForm.hide();
            messagesContainer.show();
        });
    });

    messageForm.submit(e => {
        e.preventDefault();
        const message = messageInput.val();
        const at = parseForAtUserName(message);
        if (at) {
            if (at.spaceIndex === -1 || !message[at.spaceIndex + 1]) {
                return messageElem.append(
                    $('<div class="error">Please write a name and message before sending</div>'),
                );
            }
            socket.emit('checkForUser', at.name, exists => {
                if (exists) {
                    socket.emit('personalMessage', at.name, message.substring(at.spaceIndex + 1));
                } else {
                    messageElem.append($(`<div class="error">No user named ${at.name}</div>`));
                }
            });
        } else {
            socket.emit('message', messageInput.val());
        }

        messageInput.val('');
    });
    $('#messageInput').on('keyup', () => {
        socket.emit('typing');
    });
    socket.on('someoneIsTyping', name => {
        typers[name] = typers[name] || {};
        console.log('sit',typers[name]);
        if (typers[name].countdown <= 0 || !typers[name].countdown) {
            const isTypingElem = $(`<div class="isTyping">${name} is typing</div>`);
            typers[name].elem = isTypingElem;
            currentlyTyping.append(isTypingElem);
            let keyupInterval = setInterval(() => {
                typers[name].countdown--;
                if (typers[name].countdown <= 0) {
                    clearInterval(keyupInterval);
                    typers[name].elem.remove();
                    typers[name].elem = $();
                }
            }, 1000);
        }
        typers[name].countdown = 4;
    });

    socket.on('chatters', chatters => {
        let isOtherChatters;
        const chatterers = $('#chatterers');
        chatterers.empty();
        if (chatters.length) {
            chatters.forEach((c,i) => {
                if (!user || user.name !== c) {
                    chatterers.append(`<span> ${c}${chatters[i+1]?',':''} </span>`);
                    isOtherChatters = true;
                }
            });
        }
        if (!isOtherChatters) {
            chatterers.append('<span> No one else</span>');
        }
        $('#send').attr('disabled', !isOtherChatters);
    });

    socket.on('loggedIn', thisUser => {
        user = thisUser;
        $('#userName').text(`User: ${user.name}`);
    });

    socket.on('message', (msg, personal) => {
        messageElem.append(`<div>${msg.name} ${personal? personal.personal ? 'privately ' : '' : ''}says: ${msg.msg}</div>`);
        if (msg.name !== user.name && typers[msg.name].elem) {
            typers[msg.name].elem.remove();
            typers[msg.name].elem = $();
            typers[msg.name].countdown = 0;
            console.log(typers[msg.name]);
        }
    });

    socket.on('status', msg => {
        messageElem.append(`<div class="status">${msg}</div>`);
    });

    const parseForAtUserName = string => {
        if (string[0] === '@') {
            const spaceIndex = string.indexOf(' ');
            const name = string.substring(1, spaceIndex !== -1 ? spaceIndex : string.length);
            return { name, spaceIndex };
        }
        return false;
    };
})();
