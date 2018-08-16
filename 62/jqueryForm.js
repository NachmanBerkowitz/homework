/* global $ */
(function () {
    'use strict';
    const signUpForm = $('#signUpForm');
    const signUpTable = $('#signUpTable');
    const signUpButton = $('#signUpButton');

    signUpButton.click((event) => {
        event.preventDefault();
        signUpTable.append(`<tr>
    <td>${$('#name').val()}</td>
    <td>${$('#email').val()}</td>
    </tr>`);

        signUpTable.show();

        signUpForm[0].reset();
    });
}());
