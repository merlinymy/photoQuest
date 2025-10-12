export const header = () => {
  const header = document.createElement("header");

  const isLoggedIn = Boolean(window.localStorage.getItem("userId"));
  const homeLink = document.createElement("a");
  homeLink.href = "/";

  const title = document.createElement("p");
  title.textContent = "Photo Quest";
  homeLink.appendChild(title);

  const nav = document.createElement("nav");
  const navList = document.createElement("ul");

  const questsItem = document.createElement("li");
  const questsLink = document.createElement("a");
  questsLink.href = "/pages/quests.html";
  questsLink.textContent = "Explore Quests";
  questsItem.appendChild(questsLink);

  const loginItem = document.createElement("li");
  const loginLink = document.createElement("a");
  loginLink.href = isLoggedIn ? "/pages/dashboard.html" : "/pages/login.html";
  loginLink.textContent = isLoggedIn ? "Profile" : "Sign In";
  loginItem.appendChild(loginLink);

  if (isLoggedIn) {
    const openQuestItem = document.createElement("li");
    const openQuestLink = document.createElement("a");
    openQuestLink.href = "/pages/newQuest.html";
    openQuestLink.textContent = "New Quest";
    openQuestItem.appendChild(openQuestLink);
    navList.appendChild(openQuestItem);
  }

  navList.appendChild(questsItem);
  navList.appendChild(loginItem);

  nav.appendChild(navList);

  header.appendChild(homeLink);
  header.appendChild(nav);

  return header;
};
