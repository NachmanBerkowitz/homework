/*global $*/
(function() {
    'use strict';

    let contacts = [];
    let addContactForm = $('#addContactForm');
    let theTableBody = $('#contactsTable tbody');
    let firstNameElem = $('#firstname');
    let lastNameElem = $('#lastname');
    let emailElem = $('#email');
    let phoneElem = $('#phone');
    const formUpdateButton = $('#formUpdateButton');
    const formAddButton = $('#formAddButton');

    let isUpdated = {
        firstname: false,
        lastname: false,
        email: false,
        phone: false,
    };

    $('#addContact').click(function() {
        addContactForm[0].reset();
        addContactForm.attr('onkeypress', '');
        formAddButton.show();
        formUpdateButton.hide();
        addContactForm.slideDown(1000);
    });

    theTableBody.on('click', 'button.delete', event => {
        const rowToDelete = $(event.target).closest('tr');
        $.ajax({
            method: 'DELETE',
            url: `/api/contacts/${rowToDelete.data('contactId')}`,
            success: () => {
                rowToDelete.remove();
            },
        }).fail(() => {
            alert('failed to delete');
        });
    });
    theTableBody.on('click', 'button.update', event => {
        addContactForm.attr('onkeypress', 'return event.keyCode != 13;');
        isUpdated = {
            firstname: false,
            lastname: false,
            email: false,
            phone: false,
        };
        addContactForm[0].reset();
        const rowToUpdate = $(event.target).closest('tr');
        firstNameElem.val(rowToUpdate.children('.td_firstname').text());
        lastNameElem.val(rowToUpdate.children('.td_lastname').text());
        emailElem.val(rowToUpdate.children('.td_email').text());
        phoneElem.val(rowToUpdate.children('.td_phone').text());
        formAddButton.hide();
        formUpdateButton.show();
        addContactForm.find('input').on('change', event => {
            isUpdated[$(event.target).attr('id')] = true;
        });
        addContactForm.slideDown(1000);
        $('#formUpdateButton').click(event => {
            const updates = {};
            for (const key in isUpdated) {
                if (isUpdated.hasOwnProperty(key)) {
                    if (isUpdated[key]) {
                        updates[key] = $(`#${key}`).val();
                    }
                }
            }
            updateDB(rowToUpdate.data('contactId'), updates, rowToUpdate);
            hideAddContactForm();
        });
    });

    function addContact(newContact) {
        
        if (!contacts.length) {
            theTableBody.empty();
        }
        contacts.push(newContact);

        const newRow = $(`<tr>
                            <td class="td_firstname">${newContact.firstname}</td>
                            <td class="td_lastname">${newContact.lastname}</td>
                            <td class="td_email">${newContact.email}</td>
                            <td class="td_phone">${newContact.phone}</td>
                            <td><button class="update">update</button></td>
                            <td><button class="delete">delete</button></td>
                        </tr>`)
            .appendTo(theTableBody)
            .data('contactId', newContact.id);
    }

    addContactForm.submit(function(event) {
        let newContact = {
            firstname: firstNameElem.val(),
            lastname: lastNameElem.val(),
            email: emailElem.val(),
            phone: phoneElem.val(),
        };

        $.post(
            '/api/contacts',
            newContact,
            res => {
                addContact(res);
            },
            'json',
        ).fail(() => {
            alert('failed to add contact');
        });

        hideAddContactForm();

        event.preventDefault();
    });

    $('#cancel').click(function() {
        hideAddContactForm();
    });

    function hideAddContactForm() {
        addContactForm.slideUp('slow');
        $('#formUpdateButton').off();
        addContactForm.find('input').off();
        addContactForm[0].reset();
    }

    $('#loadById').click(() =>
        $.get(`/api/contacts/${$('#ID').val()}`, loadedContact => {
            theTableBody.empty();
            addContact(loadedContact[0]);
        })
            .fail(err => {
                console.log('err', err);
            })
            .catch(err => {
                console.log('err', err);
            }),
    );
    $('#load').click(() =>
        $.get('/api/contacts', loadedContacts => {
            theTableBody.empty();
            loadedContacts.forEach(contact => addContact(contact));
        }),
    );
    const updateDB = (id, updatesObject, jqueryTableRow) => {
        $.ajax({
            method: 'PUT',
            url: `/api/contacts/${id}`,
            data: JSON.stringify(updatesObject),
            contentType: 'application/json',
            success: () => {
                if (jqueryTableRow) {
                    Object.keys(updatesObject).forEach(key => {
                        jqueryTableRow.children(`.td_${key}`).text(updatesObject[key]);
                    });
                }
            },
        }).fail(() => {
            alert('failed to delete');
        });
    };
})();
