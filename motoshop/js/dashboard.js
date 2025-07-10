// Configuração Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Verificar se está logado
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    // Carregar contadores
    carregarDados();
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
});

// Carregar dados de resumo
function carregarDados() {
  db.collection("clientes").get().then((snapshot) => {
    document.getElementById("clientesCount").textContent = snapshot.size;
  });
  db.collection("ordens").where("status", "==", "Em Andamento").get().then((snapshot) => {
    document.getElementById("ordensCount").textContent = snapshot.size;
  });
  db.collection("produtos").get().then((snapshot) => {
    document.getElementById("produtosCount").textContent = snapshot.size;
  });
}
