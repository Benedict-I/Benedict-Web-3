import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const form = document.querySelector(".contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    await addDoc(collection(db, "messages"), {
      name,
      email,
      message,
      createdAt: serverTimestamp()
    });

    showSuccess("Message sent successfully!");

    form.reset();
  } catch (err) {
    showError("Failed to send message. Try again.");
  }
});

function showSuccess(msg) {
  const el = document.getElementById("status-message");
  el.innerText = msg;
  el.style.color = "green";
}

function showError(msg) {
  const el = document.getElementById("status-message");
  el.innerText = msg;
  el.style.color = "red";
}
