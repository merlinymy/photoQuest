export const header = () => {
  const header = document.createElement("header");
  header.innerHTML = `
      <a href="/">
        <p>Photo Quest</p>
      </a>
      <nav>
        <ul>
          <li><a href="/pages/quests.html">Explore Quests</a></li>
          <li><a href="/pages/login.html">Sign In</a></li>
        </ul>
      </nav>`;
  return header;
};
