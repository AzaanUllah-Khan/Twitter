// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
// import { getFirestore, collection, getDocs, query, where, addDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
// import { getDownloadURL, getStorage, ref } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyAuuU5hk7qAe_1eXP2HrBFI7e-zxE3PTZw",
//     authDomain: "twitter-clone-254e1.firebaseapp.com",
//     projectId: "twitter-clone-254e1",
//     storageBucket: "twitter-clone-254e1.appspot.com",
//     messagingSenderId: "639210020071",
//     appId: "1:639210020071:web:e3eee6df2495543a2f5642",
//     measurementId: "G-B3ZNMTGVKJ"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth();
// const storage = getStorage();
// var CurrentUserName;
// var CurrentUserEmail;
// var CurrentUserNick;

// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         const uid = user.uid;
//         const querySnapshot = await getDocs(collection(db, "users"));
//         querySnapshot.forEach((doc) => {
//             if (doc.id == uid) {
//                 document.getElementById('h1').innerHTML = "Hey " + doc.data().nameF
//                 document.getElementById('h2').innerHTML = `${doc.data().nameF} ${doc.data().nameL}`
//                 document.getElementById('nick').innerHTML = "@" + doc.data().nick
//                 document.getElementById('loc').innerHTML = `<i class="fa fa-location-dot"></i>
//                 ${doc.data().country}`
//                 document.getElementById('ab').innerHTML = doc.data().about
//                 CurrentUserName = `${doc.data().nameF} ${doc.data().nameL}`
//                 CurrentUserEmail = `${doc.data().email}`
//                 CurrentUserNick = doc.data().nick
//             }
//         });
//         getDownloadURL(ref(storage, user.email))
//             .then((url) => {
//                 document.getElementById('img').src = url
//                 document.getElementById('img1').src = url
//                 document.getElementById('img2').src = url
//             })
//     }
// });

// onAuthStateChanged(auth, async (user) => {
//     if (!user) {
//         location.replace('./index.html')
//     }
//     const shouldF = document.getElementById('shouldFollow')
//     const q = query(collection(db, "users"), where("email", "!=", user.email));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         getDownloadURL(ref(storage, doc.data().email))
//             .then((url) => {
//                 var imgUrl = url
//                 shouldF.innerHTML += `
//             <div class="follow_bx">
//             <div class="follow_profile_name">
//             <img src="${imgUrl}" class="follow_profile">
//                                     <div class="user_name">
//                                     <div class="user_name_follow">
//                                             <h6>${doc.data().nameF} ${doc.data().nameL}</h6>
//                                             </div>
//                                         <p>${doc.data().nick}</p>
//                                         </div>
//                                         </div>
//                                         <button onclick="alert('Your are now following ${doc.data().nameF}')">Follow</button>
//                                         </div>
//                                         `
//             })
//     });
// });

// const logout = document.getElementById('lO')
// logout.addEventListener('click', () => {
//     Swal.fire({
//         title: 'Are you sure you want to LogOut?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#1ca1f1',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Logout!'
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             signOut(auth).then(() => {
//                 Swal.fire(
//                     'Logout!',
//                     'User has successfully logged out.',
//                     'success'
//                 ).then(() => {
//                     location.replace('./index.html')
//                 })
//                 // Sign-out successful.
//             }).catch((error) => {
//                 // An error happened.
//             });
//         }
//     })
// })


// async function a() {
//     var post_here = document.getElementById('post_here')
//     const querySnapshot = await getDocs(collection(db, "posts"));
//     querySnapshot.forEach((doc) => {
//         getDownloadURL(ref(storage, doc.data().senderEmail))
//             .then((url) => {
//                 post_here.innerHTML += ` 
//             <div class="post_card_bx">
//         <div class="post_profile">
//         <img src="${url}">
//         </div>
//         <div class="content">
//         <div class="top_user_sec">
//         <div class="first">
//         <h5>${doc.data().sender}</h5>
//         <h6>${doc.data().senderNick}</h6>
//         </div>
//         <div class="time">
//         <i class="fa-regular fa-clock"></i>
//         <p>${doc.data().time}</p>
//         </div>
//         </div>
//         <p class="text_of_post">${doc.data().text}</p>
//         <div class="data">
//                                     <div class="data_card">
//                                     <i class="fa-solid fa-comment"></i>
//                                     <h4>870</h4>
//                                         </div>
//                                         <div class="data_card">
//                                         <i class="fa-solid fa-retweet"></i>
//                                         <h4>11.3k</h4>
//                                         </div>
//                                         <div class="data_card">
//                                         <i class="fa-solid fa-heart" style="color: #ff0000;"></i>
//                                         <h4>89</h4>
//                                         </div>
//                                         <div class="data_card">
//                                         <i class="fa-solid fa-reply"></i>
//                                         </div>
//                                         </div>
//                                         </div>
//                                         </div>`

//             })
//     });

// }
// const post = document.getElementById('post')
// post.addEventListener('click', async () => {
//     const pT = document.getElementById('pt').value
//     var n = new Date()
//     var h = n.getHours()
//     var m = n.getMinutes()
//     try {
//         const docRef = await addDoc(collection(db, "posts"), {
//             text: pT,
//             time: `${h}:${m}`,
//             sender: CurrentUserName,
//             senderEmail: CurrentUserEmail,
//             senderNick: CurrentUserNick
//         });
//         setTimeout(() => {
//             a()
//         }, 1000)
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })

// function abc() {
//     if (document.getElementById('nameUserSearch').value != "") {
//         localStorage.setItem("searchingUser", (document.getElementById('nameUserSearch').value).toLowerCase())
//         location.replace("./profileSearch.html")
//     }
//     else {
//         Swal.fire(
//             'Error Redirecting',
//             'enter the user name to search the user.',
//             'error'
//         )
//     }
// }
// window.abc = abc


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where, addDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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
            }
        });
        getDownloadURL(ref(storage, user.email))
            .then((url) => {
                document.getElementById('img').src = url
                document.getElementById('img1').src = url
                document.getElementById('img2').src = url
            })
    }
});

var image=[]

async function Pics(){
    
    var post_here = document.getElementById('post_here')
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        // console.log(doc.data().senderEmail,"emails");
    
    getDownloadURL(ref(storage, doc.data().senderEmail))
    .then((url) => {
       image.push(url) 
 
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
        <div class="data">
        <div class="data_card">
        <i class="fa-solid fa-comment"></i>
        <h4>870</h4>
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
                                            <i class="fa-solid fa-reply"></i>
                                            <h4>89</h4>
                                            </div>
                                            </div>
                                            </div>
                                            </div>`
                                            
         
    });
})
}
Pics()




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

const logout = document.getElementById('lO')
logout.addEventListener('click', () => {
    Swal.fire({
        title: 'Are you sure you want to LogOut?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1ca1f1',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            signOut(auth).then(() => {
                Swal.fire(
                    'Logout!',
                    'User has successfully logged out.',
                    'success'
                ).then(() => {
                    location.replace('./index.html')
                })
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });
        }
    })
})


// const post = document.getElementById('post')
window.poyo=async()=>{
alert("hi")
    const pT = document.getElementById('pt').value
    var n = new Date()
    var h = n.getHours()
    var m = n.getMinutes()
    try {
       await addDoc(collection(db, "posts"), {
            text: pT,
            time: `${h}:${m}`,
            sender: CurrentUserName,
            senderEmail: CurrentUserEmail,
            senderNick: CurrentUserNick
        });
        window.location.reload()
    } catch (e) {
        console.error("Error adding document:  ",  );
  }
}