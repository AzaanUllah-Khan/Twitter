import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getDownloadURL, getStorage, ref } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAuuU5hk7qAe_1eXP2HrBFI7e-zxE3PTZw",
    authDomain: "twitter-clone-254e1.firebaseapp.com",
    projectId: "twitter-clone-254e1",
    storageBucket: "twitter-clone-254e1.appspot.com",
    messagingSenderId: "639210020071",
    appId: "1:639210020071:web:e3eee6df2495543a2f5642",
    measurementId: "G-B3ZNMTGVKJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();
var CurrentUserName;
var CurrentUserEmail;
var CurrentUserNick;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.id == uid) {
                document.getElementById('h1').innerHTML = "Hey " + doc.data().nameF
                document.getElementById('h2').innerHTML = `${doc.data().nameF} ${doc.data().nameL}`
                document.getElementById('nick').innerHTML = "@" + doc.data().nick
                document.getElementById('loc').innerHTML = `<i class="fa fa-location-dot"></i>
                ${doc.data().country}`
                document.getElementById('ab').innerHTML = doc.data().about
                CurrentUserName = `${doc.data().nameF} ${doc.data().nameL}`
                CurrentUserEmail = `${doc.data().email}`
                CurrentUserNick = doc.data().nick
                displayMessages(CurrentUserEmail)
            }
        });
        getDownloadURL(ref(storage, user.email))
            .then((url) => {
                document.getElementById('img').src = url
                document.getElementById('img1').src = url
            })
    }
});

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        location.replace('./index.html')
    }
    const shouldF = document.getElementById('shouldFollow')
    const q = query(collection(db, "users"), where("email", "!=", user.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        getDownloadURL(ref(storage, doc.data().email))
            .then((url) => {
                var imgUrl = url
                shouldF.innerHTML += `
            <div class="follow_bx">
            <div class="follow_profile_name">
            <img src="${imgUrl}" class="follow_profile">
                                    <div class="user_name">
                                    <div class="user_name_follow">
                                            <h6>${doc.data().nameF} ${doc.data().nameL}</h6>
                                            </div>
                                        <p>${doc.data().nick}</p>
                                        </div>
                                        </div>
                                        <button onclick="alert('Your are now following ${doc.data().nameF}')">Follow</button>
                                        </div>
                                        `
            })
    });
});

function abc() {
    if (document.getElementById('nameUserSearch').value != "") {
        localStorage.setItem("searchingUser", (document.getElementById('nameUserSearch').value).toLowerCase())
        location.replace("./profileSearch.html")
    }
    else {
        Swal.fire(
            'Error Redirecting',
            'enter the user name to search the user.',
            'error'
        )
    }
}
window.abc = abc


async function displayMessages(name) {
    var post_here = document.getElementById('post_box');
    post_here.innerHTML = ``;
    const q = query(collection(db, "posts"), where("senderEmail", "==", name));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const postData = doc.data();

        // Check if the 'att' attribute exists in the post data
        const attExists = postData.hasOwnProperty('att');

        // Use the 'attExists' variable to conditionally include the 'att' in the generated HTML
        const attHTML = attExists ? postData.att : '';

        getDownloadURL(ref(storage, doc.data().senderEmail))
            .then((url) => {
                post_here.innerHTML += ` 
                    <div class="post_card_bx">
                        <div class="post_profile">
                            <img src="${url}">
                        </div>
                        <div class="content">
                            <div class="top_user_sec">
                                <div class="first">
                                    <h5>${doc.data().sender}</h5>
                                    <h6>${doc.data().senderNick}</h6>
                                </div>
                                <div class="time">
                                    <i class="fa-regular fa-clock"></i>
                                    <p>${doc.data().time}</p>
                                </div>
                            </div>
                            <p class="text_of_post">${doc.data().text}</p>
                            <img src="${attHTML}" class="att">
                            <div class="data">
                                <div class="data_card">
                                <i class="fa-solid fa-edit" onclick="edit('${doc.id}')"></i>
                                </div>
                                <div class="data_card">
                                    <i class="fa-solid fa-retweet"></i>
                                    <h4>11.3k</h4>
                                </div>
                                <div class="data_card">
                                    <i class="fa-solid fa-heart" style="color: #ff0000;"></i>
                                    <h4>89</h4>
                                </div>
                                <div class="data_card">
                                <i class="fa-solid fa-trash" onclick="del('${doc.id}')"></i>
                                </div>
                            </div>
                        </div>
                    </div>`;
            })
    });
}

async function del(toDel) {
    await deleteDoc(doc(db, "posts", toDel));
    window.location.reload()
}
window.del = del

function edit(id) {
    const azaan = doc(db, "posts", id);
    Swal.fire({
        title: `Enter Value to Replace`,
        input: 'text',
        confirmButtonText: 'Replace / Edit !',
        showLoaderOnConfirm: true,
    }).then(async (result) => {
        if (result.isConfirmed) {
            await updateDoc(azaan, {
                text: result.value + " (edited on " + new Date().getHours() + ":" + new Date().getMinutes() + " )"
            });
            Swal.fire({
                title: `Value Replaced`,
                icon: 'success'
            }).then(() => {
                location.reload()
            })
        }
    })
}
window.edit = edit