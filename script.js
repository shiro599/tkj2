
const firebaseConfig = {
  apiKey: "AIzaSyCKn6AnyFBAVKIZW0hkdUl2rxRPKuEg_uE",
  authDomain: "projects-tkj.firebaseapp.com",
  databaseURL: "https://projects-tkj-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projects-tkj",
  storageBucket: "projects-tkj.appspot.com",
  messagingSenderId: "1068028451955",
  appId: "1:1068028451955:web:3b157a492ddcb062199e06"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const form = document.getElementById("absenForm");
const tipe = document.getElementById("tipe");
const kelasDiv = document.getElementById("kelasDiv");
const successMsg = document.getElementById("successMsg");

tipe.addEventListener("change", () => {
  kelasDiv.style.display = tipe.value === "murid" ? "block" : "none";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const jenis = tipe.value;
  const nama = document.getElementById("nama").value.trim();
  const instansi = document.getElementById("instansi").value.trim();
  const kelas = document.getElementById("kelas").value;

  if (!jenis || !nama || !instansi || (jenis === "murid" && !kelas)) {
    alert("Mohon lengkapi semua data!");
    return;
  }

  const waktu = new Date().toLocaleString("id-ID");
  const entry = { nama, instansi, kelas: kelas || "-", waktu };
  const key = jenis === "murid" ? "absensiMurid" : "absensiGuru";

  db.ref(key).push(entry)
    .then(() => {
      form.reset();
      kelasDiv.style.display = "none";
      successMsg.classList.remove("hidden");
      setTimeout(() => successMsg.classList.add("hidden"), 3000);
    })
    .catch((error) => {
      alert("Gagal mengirim data. Silakan coba lagi.");
      console.error(error);
    });
});

const adminBtn = document.getElementById("adminBtn");
const adminModal = document.getElementById("adminModal");
const batalBtn = document.getElementById("batalBtn");
const submitBtn = document.getElementById("submitPassword");
const passwordInput = document.getElementById("adminPassword");
const errorMsg = document.getElementById("errorMsg");
const passwordBenar = "KhZrzHUMK@BaJT6";

adminBtn.addEventListener("click", () => {
  adminModal.classList.remove("hidden");
  passwordInput.value = "";
  errorMsg.classList.add("hidden");
});

batalBtn.addEventListener("click", () => {
  adminModal.classList.add("hidden");
});

submitBtn.addEventListener("click", () => {
  if (passwordInput.value === passwordBenar) {
    localStorage.setItem("adminLogin", "true");
    window.location.href = "admin.html";
  } else {
    errorMsg.classList.remove("hidden");
  }
});
