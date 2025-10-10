import { addHeader } from "../components/utils.js";

addHeader();

const questId = new URLSearchParams(window.location.search).get("id");

const data = await fetch(`/quest/${questId}`);
console.log(data);
