'use strict';

class Builder {

    constructor() {
        this.initData();
        this.initHandlers();
    }

    initHandlers() {
        this.createUser();
        this.editTable();
        this.renderTable();
    }

    initData() {
        this.tableData = [];
        this.storage = localStorage;
    }

    validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    createUser() {
        this.btn = document.getElementById('add-btn');

        this.btn.addEventListener('click', e => {

            this.name = document.getElementById('name').value;
            this.email = document.getElementById('email').value;
            this.role = document.getElementById('formRole');
            this.roleVal = this.role.options[this.role.selectedIndex].text;
            this.validateEmail(this.email);
            if (!this.name) throw 'Name couldn\'t be empty!';
            if (!this.email) throw 'Email couldn\'t be empty!';
            if (!this.roleVal) throw 'Role couldn\'t be empty!';

            e.preventDefault();
            // generate id
            const objectHash = Math.random().toString(36).substring(7);

            // prepare object 
            let userObject;
            let userData = { 'id': objectHash, 'name': this.name, 'email': this.email, 'role': this.roleVal };
            switch (this.roleVal) {
                case 'admin':
                    { userObject = new Admin(userData) };
                    break;
                case 'user':
                    { userObject = new User(userData) };
                    break;
                case 'guest':
                    { userObject = new Guest(userData) };
                    break;
            }
            this.addElementToStorage(objectHash, userObject);
            this.renderElement(userObject);
        });
    }

    editTable() {
        this.table = document.querySelector('table');
        this.table.addEventListener('change', e => {
            this.id = e.target.parentNode.parentNode.getAttribute('data-id');
            this.currentElement = this.getElemetFromStorage(this.id);
            this.newValue = e.target.value;
            if (this.currentElement) {
                this.currentElement[e.target.parentNode.getAttribute('data-property')] = this.newValue;

                //@todo validate data
                this.addElementToStorage(this.id, this.currentElement);
                e.target.parentNode.innerHTML = this.newValue;
            }
        });

        this.table.addEventListener('dblclick', e => {
            if (e.target.nodeName == 'TD') {
                // insert input field 
                const inputField = `<input data-input type="text" value="${e.target.innerHTML}">`;
                e.target.innerHTML = inputField;
            }
        })
    }

    getElemetFromStorage(id) {
        return (JSON.parse(this.storage.getItem(id))) || false;
    }

    addElementToStorage(id, object) {
        this.storage.setItem(id, JSON.stringify(object));
    }

    parseTableElements() {
        for (let i = 0; i < this.storage.length; i++) {
            let trData = JSON.parse(this.storage.getItem(this.storage.key([i])));
            if (trData.id && trData.email && trData.role) {
                this.tableData.push(trData);
            }
        }
    }

    renderElement(stringData) {
        this.wrapTable = document.querySelector('table');

        return this.wrapTable.insertAdjacentHTML('beforeEnd',
            `<tr data-id='${stringData.id}'>
              <td data-property='name'>${stringData.name}</td>
              <td data-property='email'>${stringData.email}</td>
              <td data-property='role'>${stringData.role}</td>
           </tr>`);
    }

    renderTable() {
        this.parseTableElements();

        this.wrapTable = document.querySelector('table');

        let str = '';
        for (let i = 0; i < this.tableData.length; i++) {
            str += `<tr data-id='${this.tableData[i].id}'><td data-property='name'>${this.tableData[i].name}</td>
            <td data-property='email'>${this.tableData[i].email}</td>
            <td data-property='role'>${this.tableData[i].role}</td>
        </tr>`;

        }
        return this.wrapTable.insertAdjacentHTML('beforeEnd', str);
    }
}

try {

    const app = new Builder();

} catch (e) {

    console.log(e);
}
