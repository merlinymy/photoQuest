import { header } from "./Header.js";

const addHeader = () => {
  const body = document.querySelector("body");
  body.prepend(header());
};

export { addHeader };
