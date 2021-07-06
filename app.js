let onSingup = () => {
    // get input values
    let fullName = document.getElementById('fullName');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let phoneNumber = document.getElementById('phoneNumber');
    let address = document.getElementById('address');
    let message = document.getElementById('message');


    if (fullName.value !== '' && email.value !== '' && password.value !== '' && phoneNumber.value !== '' && address.value !== '') {


        let user = {
            fullName: fullName.value,
            email: email.value,
            password: password.value,
            phoneNumber: phoneNumber.value,
            address: address.value,
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];

        let userIdx = users.findIndex(function (val) {
            return val.email.toLowerCase() === user.email.toLowerCase()
        });


        if (userIdx === -1) {
            // this user do not exist
            users.push(user);
            // store in storage
            localStorage.setItem("users", JSON.stringify(users));
            // redirect to login page
            location.href = 'login.html';
            fullName.value = ""
            email.value = ""
            phoneNumber.value = ""
            address.value = ""
        } else {
            message.innerHTML = user.email.split("@")[0] + " use in another account";
            this.message.classList.remove("btn-primary")
            this.message.classList.add("btn-danger")
        }

    } else {
        message.innerHTML = "Plaease fill All fileds";
        this.message.classList.add("btn-danger")
        this.message.classList.remove("btn-primary")
    }
    // clear message box
    setTimeout(() => {
        message.innerHTML = "Register";
        this.message.classList.remove("btn-danger")
        this.message.classList.add("btn-primary")
    }, 2000);

    // };
}

// login section


let onLogin = () => {

    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let message = document.getElementById('message');
    if (email.value !== '' && password.value !== '') {
        let user = {
            email: email.value,
            password: password.value,
        };


        var users = JSON.parse(localStorage.getItem("users")) || [];

        var currentUser = users.find(function (val) {
            return val.email.toLowerCase() === user.email.toLowerCase() && val.password === user.password;
        });
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
            // user login
            location.href = "index.html";
        } else {
            message.innerHTML = "Invalid credentials";
            this.message.classList.remove("btn-primary")
            this.message.classList.add("btn-danger")
        }
    } else {
        message.innerHTML = "Plaease fill All fileds";
        this.message.classList.add("btn-danger")
        this.message.classList.remove("btn-primary")
    }
    // clear state
    setTimeout(() => {
        message.innerHTML = "Login";
        this.message.classList.remove("btn-danger")
        this.message.classList.add("btn-primary")
    }, 2000);
}


// show user Current Data 

function getCurrentUser() {


    var userName = document.getElementById("userName");
    var userMail = document.getElementById("userMail");
    var userPhoneNo = document.getElementById("userPhoneNo");
    var userAddress = document.getElementById("userAddress");
    var userNameHead = document.getElementById("userName2");
    var user = JSON.parse(localStorage.getItem("user"));

    // Show User Data on Document 
    userNameHead.innerHTML = `Welcome   ${user.fullName.split("")[0].toUpperCase()}`;
    userName.innerHTML = `${user.fullName} <i class="fas fa-edit" onclick='onEdit("fullName")'></i>`;
    userMail.innerHTML = `Email:   ${user.email}`;
    userPhoneNo.innerHTML = `Phone No:   ${user.phoneNumber}  <i class="fas fa-edit" onclick='onEdit("phoneNumber")'></i>`;
    userAddress.innerHTML = `Address:   ${user.address}    <i class="fas fa-edit" onclick='onEdit("address")'></i>`;

}

// post Item 

function onPost() {

    let title = document.getElementById('title');
    let discrip = document.getElementById('discrip');
    let postBtn = document.getElementById('postBtn');





    if (title.value !== '' && discrip.value !== '' && title.value !== '  ' && discrip.value !== '  ') {

        let postMain = document.getElementById('postMain');
        // console.log(postMain)
        // dynamic PostDiv 
        let postDiv = document.createElement('div')
        postDiv.setAttribute('class', 'card');
        // dynamic PostImg 
        let postImg = document.createElement('img');
        postImg.setAttribute('class', 'card-img-top');
        postImg.setAttribute('id', 'output');
        postImg.setAttribute('width', '200');
        postImg.setAttribute("src", 'img_avatar.png');
        postDiv.appendChild(postImg);
        // console.log(postImg);
        // dynamic Post Card Body 
        let card_body = document.createElement('div');
        card_body.setAttribute('class', 'card-body');
        postDiv.appendChild(card_body);
        // dynamic Post Card Body Title 
        let cardTitle = document.createElement('h5');
        let titleText = document.createTextNode(title.value)
        cardTitle.setAttribute('class', 'card-title');
        cardTitle.appendChild(titleText);
        card_body.appendChild(cardTitle);
        // dynamic Post Card Body Title 
        let cardDiscrip = document.createElement('p');
        let discripText = document.createTextNode(discrip.value)
        cardDiscrip.setAttribute('class', "card-text");
        // Delete Post 
        let deleteItem = document.createElement('button');
        let deleteText = document.createTextNode('Delete Item');
        deleteItem.setAttribute('class', 'btn-danger');
        deleteItem.setAttribute('onclick', 'deleteItem(this)');
        deleteItem.appendChild(deleteText);

        cardDiscrip.appendChild(discripText);
        card_body.appendChild(cardDiscrip);
        card_body.appendChild(deleteItem);
        postMain.appendChild(postDiv)
        title.value = '';
        discrip.value = '';

    } else {
        postBtn.innerHTML = "Plaease fill All fileds";
        this.postBtn.classList.add("btn-danger")
        this.postBtn.classList.remove("btn-primary")

    }
    setTimeout(() => {
        postBtn.innerHTML = "Post";
        this.postBtn.classList.remove("btn-danger")
        this.postBtn.classList.add("btn-primary")
    }, 1000);
    console.log(postMain)
}
// logout Section 


let onLogout = () => {

    var logOutMessage = document.getElementById("logout");
    localStorage.removeItem("user");
    logOutMessage.innerHTML = "Good Bye!";
    logOutMessage.classList.add("btn-success")
    logOutMessage.classList.remove("btn-dark");
    alert('Thank Your :)')
    // clear state
    setTimeout(() => {
        location.href = "login.html";
    }, 2000);
}


// delete Item Section
let deleteItem = (e) => {
    e.parentNode.parentNode.remove()
}


// Edit User Data  

let onEdit = (e) => {
    var user = JSON.parse(localStorage.getItem("user"));
    let users = JSON.parse(localStorage.getItem('users'));
    var edit = prompt("Enter updated value",)
    for (var i = 0; i < users.length; i++) {
        if (user[e] === users[i][e]) {
            user[e] = edit;
            users[i][e] = edit;
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("user", JSON.stringify(user));
        }
        break;
    }
    location.href = "index.html"
}



