import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyBgzt2SH1AbEp4pszJZqpmFo0XztAJX2E",
    authDomain: "omt-aula-interactiva.firebaseapp.com",
    databaseURL: "https://omt-aula-interactiva-default-rtdb.firebaseio.com",
    projectId: "omt-aula-interactiva",
    storageBucket: "omt-aula-interactiva.firebasestorage.app",
    messagingSenderId: "965926127735",
    appId: "1:965926127735:web:6b17cdd7a394c0c9e2de72"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };
