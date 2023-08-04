import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where, updateDoc, doc, onSnapshot, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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


async function a() {
    var post_here = document.getElementById('post_here');
    const querySnapshot = await getDocs(collection(db, "posts"));

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
                                    <i class="fa-solid fa-comment"></i>
                                    <h4>0</h4>
                                </div>
                                <div class="data_card">
              <i class="fa-solid fa-heart" 
                 id="heart-${doc.id}" 
                 onclick="addToLike('${doc.id}')"
                 style="color: ${postData.likedBy && postData.likedBy.includes(auth.currentUser.uid) ? '#ff0000' : ''};">
              </i>
              <h4 id="likes-${doc.id}">${postData.likes || 0}</h4>
            </div>
                            </div>
                        </div>
                    </div>`;
            })
        onSnapshot(doc.ref, (snapshot) => {
            try {
                const updatedData = snapshot.data();
                const likesElement = document.getElementById(`likes-${doc.id}`);
                if (likesElement) {
                    likesElement.innerText = updatedData.likes || 0;
                }
                const heartIcon = document.getElementById(`heart-${doc.id}`);
                if (heartIcon) {
                    heartIcon.style.color = updatedData.likedBy && updatedData.likedBy.includes(auth.currentUser.uid) ? '#ff0000' : '';
                }
            } catch (error) {
                console.error('Error updating like status:', error);
            }
        });
    });
}

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
a()

document.getElementById('post_here').addEventListener('scroll', function () {
    var postHereElement = document.getElementById('post_here');
    var showButton = document.getElementById('showBTN');

    if (postHereElement.scrollHeight - postHereElement.scrollTop <= postHereElement.clientHeight + 50) {
        showButton.style.opacity = '0.5';
        showButton.style.visibility = 'visible';
    } else {
        showButton.style.opacity = '0';
        showButton.style.visibility = 'hidden';
    }
});

async function showLikes(postId) {
    const postRef = doc(db, "posts", postId);
    const unsubscribe = onSnapshot(postRef, (doc) => {
        if (doc.exists()) {
            const newLikesCount = doc.data().likes || 0;
            const likesElement = document.getElementById(`likes-${postId}`);
            likesElement.innerText = newLikesCount;
        }
    });
}
function hasLikedPost(postId) {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    return likedPosts.includes(postId);
}

function updateLikedPosts(postId) {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    if (hasLikedPost(postId)) {
        // If the post is already liked, remove the like from local storage
        localStorage.setItem(
            "likedPosts",
            JSON.stringify(likedPosts.filter((id) => id !== postId))
        );
    } else {
        // If the post is not liked, add the like to local storage
        localStorage.setItem("likedPosts", JSON.stringify([...likedPosts, postId]));
    }
}

async function addToLike(id) {
    const postRef = doc(db, "posts", id);
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();

    // Check if the user ID is already in the likedBy array
    if (postData.likedBy && postData.likedBy.includes(auth.currentUser.uid)) {
        // If the user has already liked the post, remove the like (dislike the post)
        await updateDoc(postRef, {
            likes: Math.max((postData.likes || 0) - 1, 0),
            likedBy: postData.likedBy.filter(userId => userId !== auth.currentUser.uid)
        });
    } else {
        // If the user has not liked the post, add the like
        await updateDoc(postRef, {
            likes: (postData.likes || 0) + 1,
            likedBy: [...(postData.likedBy || []), auth.currentUser.uid]
        });
    }
}









window.addToLike = addToLike;

