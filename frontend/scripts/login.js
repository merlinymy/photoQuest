import { addHeader } from "../components/utils.js";

addHeader();

const emailLogin = document.querySelector(".login-email");
const formEle = document.getElementById("loginForm");
emailLogin.addEventListener("click", async (e) => {
  e.preventDefault();
  const formData = new FormData(formEle);
  const email = Object.fromEntries(formData.entries()).email;
  const userId = await (await fetch(`/user/id/${email}`)).json();
  window.localStorage.setItem("userId", userId);
  window.location.href = "/pages/dashboard.html";
});
