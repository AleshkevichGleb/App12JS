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
        this.localData = window.localStorage.getItem('contacts');
        this.id = 1;
        this.render();
    }
    
    get storage() {
        return this.localData;
    }

    set storage(localData) {

    }

    render() {
        if(this.localData && this.localData.length > 0) {
            this.arrLocalData = JSON.parse(this.localData);
            this.arrLocalData.forEach(contact => {
                this.onAdd(contact);
                super.add(contact);
            }) 
        }

        const container = document.querySelector('.container__create');

        container.addEventListener('submit', event => {
            event.preventDefault();

            window.location.reload();

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

            let date = new Date(Date.now() + 20000)
            date = date.toUTCString();
            window.localStorage.setItem('contacts', JSON.stringify(this.data));
            document.cookie = `storageExpiration=${encodeURIComponent(window.localStorage.getItem('contacts'))};expires=`+ date;
            // document.cookie='storageExpiration=; max-age=-1'

            // document.cookie = 'name=John; expires=' + date;
            // document.cookie = 'name=; max-age=-1'
            this.onAdd(this.contactData);
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
       
    }

    onRemove() {
        this.removeButton.addEventListener('click', event => {
            const {target} = event;

            this.containerParent = target.closest('.container__fieldForContact')
            console.log(this.containerParent);

            let objIndex = this.arrLocalData.findIndex(obj => obj.id == Number(this.containerParent.getAttribute('id')));

            // let objIndex = this.arrLocalData.findIndex(obj => obj.name == this.nameContact.innerHTML && obj.phone == this.phoneContact.innerHTML && 
            //                                                   obj.email == this.emailContact.innerHTML && obj.address == this.addressContact.innerHTML);

            this.arrLocalData.forEach(obj => {
                console.log(obj.id == 1);
            })

            console.log(this.containerParent.getAttribute('id'), typeof this.containerParent.getAttribute('id'));
            console.log(this.containerParent);
            console.log(objIndex);
            this.arrLocalData.splice(objIndex, 1);
            window.localStorage.setItem('contacts', JSON.stringify(this.arrLocalData));

            this.containerParent.remove();
            super.remove(+this.containerParent.id)
            console.log(this.arrLocalData);
       })

    }

    onEdit(nameContact, phoneContact, emailContact, addressContact) {


        this.editButton.addEventListener('click', (event) => {
            event.preventDefault();

            const {target} = event;

            const newContact = {};
            const containerParent = target.closest('.container__fieldForContact')

            console.log(this.arrLocalData);
            let objIndex = this.arrLocalData.findIndex(obj => obj.name = nameContact.innerHTML);
            nameContact.innerHTML = newContact.name = prompt('Name', nameContact.innerHTML)|| nameContact.innerHTML;
            this.arrLocalData[objIndex].name = newContact.name;

            objIndex = this.arrLocalData.findIndex(obj => obj.phone = phoneContact.innerHTML);
            phoneContact.innerHTML = newContact.phone = prompt('Phone', phoneContact.innerHTML)|| phoneContact.innerHTML;
            this.arrLocalData[objIndex].phone = newContact.phone;

            objIndex = this.arrLocalData.findIndex(obj => obj.email = emailContact.innerHTML);
            emailContact.innerHTML = newContact.email = prompt('Email', emailContact.innerHTML) || emailContact.innerHTML;
            this.arrLocalData[objIndex].email = newContact.email;

            objIndex = this.arrLocalData.findIndex(obj => obj.address = addressContact.innerHTML);
            addressContact.innerHTML = newContact.address = prompt('City', addressContact.innerHTML)|| addressContact.innerHTML;
            this.arrLocalData[objIndex].address = newContact.address;


            window.localStorage.setItem('contacts', JSON.stringify(this.arrLocalData));

            super.edit(+containerParent.id, newContact);
        })
    }
}

    
const contactApp = new ContactsApp();
console.log(contactApp.storage);

// console.log(contactApp);



