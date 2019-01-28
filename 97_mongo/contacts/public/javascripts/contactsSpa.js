/*global $*/
(function() {
    'use strict';

    let contacts = [];

    let addContactFormJq = $('#addContactForm');
    let theTableBodyJq = $('#contactsTable tbody');
    let firstNameInputJq = $('#firstname');
    let lastNameInputJq = $('#lastname');
    let emailInputJq = $('#email');
    let phoneInputJq = $('#phone');
    const formUpdateButtonJq = $('#formUpdateButton');
    const formAddButtonJq = $('#formAddButton');
    const getExampleIdButtonJq = $('#exampleId');

    let isUpdated = {
        firstname: false,
        lastname: false,
        email: false,
        phone: false,
    };

    $('#addContact').click(function() {
        addContactFormJq[0].reset();
        addContactFormJq.attr('onkeypress', '');
        formAddButtonJq.show();
        formUpdateButtonJq.hide();
        addContactFormJq.slideDown(1000);
    });

    theTableBodyJq.on('click', 'button.delete', event => {
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
    theTableBodyJq.on('click', 'button.update', event => {
        addContactFormJq.attr('onkeypress', 'return event.keyCode != 13;');
        isUpdated = {
            firstname: false,
            lastname: false,
            email: false,
            phone: false,
        };
        addContactFormJq[0].reset();
        const rowToUpdate = $(event.target).closest('tr');
        firstNameInputJq.val(rowToUpdate.children('.td_firstname').text());
        lastNameInputJq.val(rowToUpdate.children('.td_lastname').text());
        emailInputJq.val(rowToUpdate.children('.td_email').text());
        phoneInputJq.val(rowToUpdate.children('.td_phone').text());
        formAddButtonJq.hide();
        formUpdateButtonJq.show();
        addContactFormJq.find('input').on('change', event => {
            isUpdated[$(event.target).attr('id')] = true;
        });
        addContactFormJq.slideDown(1000);
        formUpdateButtonJq.click(() => {
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

    addContactFormJq.submit(function(event) {
        let newContact = {
            firstname: firstNameInputJq.val(),
            lastname: lastNameInputJq.val(),
            email: emailInputJq.val(),
            phone: phoneInputJq.val(),
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

    $('#load').click(() =>
        $.get('/api/contacts', loadedContacts => {
            theTableBodyJq.empty();
            loadedContacts.forEach(contact => addContact(contact));
        }),
    );
    getExampleIdButtonJq.click(() => {
        $.get('/api/contacts/exampleId')
            .done(id => $('#ID').val(id))
            .catch(err => {
                window.alert('No Ids found');
                console.log(err);
            });
    });
    $('#loadById').click(() =>
        $.get(`/api/contacts/${$('#ID').val()}`, loadedContact => {
            theTableBodyJq.empty();
            addContact(loadedContact);
        })
            .fail(err => {
                console.log('err', err);
            })
            .catch(err => {
                console.log('err', err);
            }),
    );

    function addContact(newContact) {
        if (!contacts.length) {
            theTableBodyJq.empty();
        }
        contacts.push(newContact);

        $(`<tr>
             <td class="td_firstname">${newContact.firstname}</td>
             <td class="td_lastname">${newContact.lastname}</td>
             <td class="td_email">${newContact.email}</td>
             <td class="td_phone">${newContact.phone}</td>
             <td><button class="update">update</button></td>
             <td><button class="delete">delete</button></td>
           </tr>`)
            .appendTo(theTableBodyJq)
            .data('contactId', newContact._id);
        console.log(newContact._id);
    }

    function hideAddContactForm() {
        addContactFormJq.slideUp('slow');
        formUpdateButtonJq.off();
        addContactFormJq.find('input').off();
        addContactFormJq[0].reset();
    }
    
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
            alert('failed to update');
        });
    };
})();
