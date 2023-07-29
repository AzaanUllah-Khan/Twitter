
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.id == uid) {
                document.getElementById('namef').value = doc.data().nameF
                document.getElementById('namel').value = doc.data().nameL
                document.getElementById('about').value = doc.data().about
                document.getElementById('nick').value = doc.data().nick
                document.getElementById('country').value = doc.data().country
                document.getElementById('phone').value = doc.data().phone
            }
        });
        getDownloadURL(ref(storage, user.email))
            .then((url) => {
                document.getElementById('user').src = url
            })
    }
});
const btnAccount = document.getElementById('editBtn')
btnAccount.addEventListener('click', async () => {
    const nameF = document.getElementById('namef').value
    const nameL = document.getElementById('namel').value
    const country = document.getElementById('country').value
    const phone = document.getElementById('phone').value
    const about = document.getElementById('about').value
    const nick = document.getElementById('nick').value
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            const washingtonRef = doc(db, "users", uid);
            await updateDoc(washingtonRef, {
                nameF,
                nameL,
                country,
                phone,
                about,
                nick,
                name: `${(nameF).toLowerCase()} ${(nameL).toLowerCase()}`
            });
            Swal.fire({
                title: 'Changes Done',
                text: 'You profile changes have been edited successfully',
                icon: "success"
            }).then(() => {
                Swal.fire({
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                }).then(() => {
                    location.replace('./profileManage.html');
                });
            });
        }
    });
    // ...
})
