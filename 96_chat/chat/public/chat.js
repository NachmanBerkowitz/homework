/* global $, io */
(function() {
    'use strict';

    const socket = io();

    let user;

    const messageInput = $('#messageInput');
    const loginForm = $('#loginForm');
    const messagesContainer = $('#messagesContainer');
    const messagesDispalyElem = $('#messagesDisplay');
    const newMessageForm = $('#newMessageForm');
    const currentlyTypingDisplayElem = $('#currentlyTypingDisplay');

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

    newMessageForm.submit(e => {
        e.preventDefault();
        const message = messageInput.val();
        if(message.trim().length === 0)return;
        const at = parseForAtUserName(message);
        if (at) {
            if (at.spaceIndex === -1 || !message[at.spaceIndex + 1]) {
                return messagesDispalyElem.append(
                    $('<div class="error">Please write a name and message before sending</div>'),
                );
            }
            socket.emit('checkForUser', at.name, exists => {
                if (exists) {
                    const msg = message.substring(at.spaceIndex + 1);
                    socket.emit('personalMessage', at.name, msg);
                    appendMessage({name:user.name,msg},{privateFromMe:at.name});
                } else {
                    messagesDispalyElem.append($(`<div class="error">No user named ${at.name}</div>`));
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
        if (typers[name].countdown <= 0 || !typers[name].countdown) {
            const isTypingElem = $(`<div class="isTyping">${name} is typing</div>`);
            typers[name].elem = isTypingElem;
            currentlyTypingDisplayElem.append(isTypingElem);
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
        const chatterersDisplayElem = $('#chatterersDisplay');
        chatterersDisplayElem.empty();
        if (chatters.length) {
            chatters.forEach((c,i) => {
                if (!user || user.name !== c) {
                    chatterersDisplayElem.append(`<span> ${c}${chatters[i+1]?',':''} </span>`);
                    isOtherChatters = true;
                }
            });
        }
        if (!isOtherChatters) {
            chatterersDisplayElem.append('<span> No one else</span>');
        }
        $('#send').attr('disabled', !isOtherChatters);
    });

    socket.on('loggedIn', thisUser => {
        user = thisUser;
        $('#userName').text(`Your user name: ${user.name}`);
    });

    
    socket.on('status', msg => {
        messagesDispalyElem.append(`<div class="status">${msg}</div>`);
    });
    
    const parseForAtUserName = string => {
        if (string[0] === '@') {
            const spaceIndex = string.indexOf(' ');
            const name = string.substring(1, spaceIndex !== -1 ? spaceIndex : string.length);
            return { name, spaceIndex };
        }
        return false;
    };
    
    const appendMessage = (msg, personalObj={}) => {
        // const personal = personalObj ? personalObj.personal : false;
        messagesDispalyElem.append(`<div>${personalObj.personal? '<span class="privateMessage">(Private Message) </span>' : ''}
        ${personalObj.privateFromMe? `<span class="privateMessage">(Private Message to ${personalObj.privateFromMe}) </span>` : ''}
        <span class="messageName">${msg.name === user.name?'you':msg.name}: </span>${msg.msg}</div>`);
        if (typers[msg.name] && typers[msg.name].elem) {
            typers[msg.name].elem.remove();
            typers[msg.name].elem = $();
            typers[msg.name].countdown = 0;
        }
    };
    socket.on('message', appendMessage);
})();
