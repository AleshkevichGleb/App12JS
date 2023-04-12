"use strict"

let user1 = {
    id: '1',
    name: 'gleb',
    email: 'gleb@gmail.com',
    address: 'Minsk',
    phone: '+3752921234'
}

let user2 = {
    id: '2',
    name: 'sasha',
    email: 'sasha@gmail.com',
    address: 'Moscow',
    phone: '+8032324'
}

class User {
    constructor(contactData) {
        this.data = contactData;
    }

    edit(obj) {
        this.data = obj;
    }

    get() {
        return this.data;
    }
}

let user = new User(user1);


class Contacts {
    constructor() {
        this.data = []
    }

    add(newContact) {
        const newCont = new User(newContact);
        this.data = [...this.data, newCont.data]
    }

    edit(id, objName) {
        const contacts = this.data.map(element => {
            if(element.id === id) {
                return {...element, ...objName};
            } else {
                return element;
            }
        })

        user.edit.call(this, contacts);
    }

    remove(id) {
        this.data = this.data.filter(contact => contact.id !== id);
    }

    get() {
        return this.data;
    }
}


let contact = new Contacts();


class ContactsApp extends Contacts {
    constructor() {
        super();
        this.id = 1;
        this.render();
    }
    
    setCookie(name, value) {
        let date = new Date();
        date.setDate(date.getDate() + 10);
        document.cookie = `${name}=${value};path=/;expires=${date}`;
    }

    handleLocalStorage() {
        if(!this.data.length) {
            return localStorage.removeItem('contacts');
        } else {
            localStorage.setItem('contacts', JSON.stringify(this.data));
            this.setCookie('storageExpiration', 'true');
        }
    }

    render() {
        const container = document.querySelector('.container__create');

        container.addEventListener('submit', event => {
            event.preventDefault();

            const {elements} = container;
            this.contactData = {};

            Array.from(elements)
            .filter(element => element.name)
            .forEach(element => {
                const {name, value} = element;
                this.contactData[name] = value;
                this.contactData.id = this.id;
                element.value = ''
            })


            super.add(this.contactData);
            this.onAdd(this.contactData);

            this.handleLocalStorage();
        })
    }


    onAdd(pointer) {
        const containerContact = document.querySelector('.container__contact');

        this.fieldForContact = document.createElement('div');
        this.fieldForContact.className = 'container__fieldForContact';

        this.nameContact = document.createElement('span');
        this.nameContact.innerHTML = pointer.name
        this.nameContact.className = 'container__nameContact';

        this.emailContact = document.createElement('span');
        this.emailContact.innerHTML = pointer.email
        this.emailContact.className = 'container__emailContact';

        this.addressContact = document.createElement('span');
        this.addressContact.innerHTML = pointer.address;
        this.addressContact.className = 'container__addressContact';

        this.phoneContact = document.createElement('span');
        this.phoneContact.innerHTML = pointer.phone;
        this.phoneContact.className = 'container__phone__Contact';

        this.fieldForButton = document.createElement('div');
        this.fieldForButton.className = 'container__fieldForButton';

        this.editButton = document.createElement('button');
        this.editButton.innerHTML = 'Edit';
        this.editButton.classList.add('button', 'editButton')

        this.removeButton = document.createElement('button');
        this.removeButton.innerHTML = 'Remove';
        this.removeButton.classList.add('button', 'removeButton');

        this.fieldForButton.append(this.editButton, this.removeButton)

        this.fieldForContact.append(this.nameContact, this.emailContact,
            this.addressContact, this.phoneContact, this.fieldForButton); 
             
        this.fieldForContact.setAttribute('id', this.id);
        this.id++;

        containerContact.prepend(this.fieldForContact);

        this.butttonsRemove = document.querySelectorAll('.removeButton');
        this.buttonsEdit = document.querySelectorAll('.editButton');

        this.onRemove();
        this.onEdit(this.nameContact, this.phoneContact, this.emailContact, this.addressContact);
        this.handleLocalStorage();
       
    }

    onRemove() {
        this.removeButton.addEventListener('click', event => {
            const {target} = event;

            this.containerParent = target.closest('.container__fieldForContact')
            this.containerParent.remove();
            super.remove(+this.containerParent.id)
            this.handleLocalStorage();
       })

    }

    onEdit(nameContact, phoneContact, emailContact, addressContact) {


        this.editButton.addEventListener('click', (event) => {
            event.preventDefault();

            const {target} = event;

            const newContact = {};
            const containerParent = target.closest('.container__fieldForContact')

           
            nameContact.innerHTML = newContact.name = prompt('Name', nameContact.innerHTML)|| nameContact.innerHTML;              
            phoneContact.innerHTML = newContact.phone = prompt('Phone', phoneContact.innerHTML)|| phoneContact.innerHTML;
            emailContact.innerHTML = newContact.email = prompt('Email', emailContact.innerHTML) || emailContact.innerHTML;
            addressContact.innerHTML = newContact.address = prompt('City', addressContact.innerHTML)|| addressContact.innerHTML;

            super.edit(+containerParent.id, newContact);
            this.handleLocalStorage();
        })
    }
}

    
const contactApp = new ContactsApp();