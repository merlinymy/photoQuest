import { addHeader } from "../components/utils.js";

const body = document.querySelector("body");

body.append(await populateTopQuests());
addHeader();
// populateTopQuests();
// populateCategories();

function buildTopQuests(quests) {
  const topQuestsWrap = document.createElement("div");
  topQuestsWrap.classList.add("top-quests-wrap");

  // topQuests header
  const head = document.createElement("div");
  const sectionName = document.createElement("h3");
  sectionName.textContent = "Popular Quests";
  const viewAllBtn = document.createElement("a");
  viewAllBtn.href = "/pages/allQuests.html";
  head.append(sectionName, viewAllBtn);

  // topQuests main
  const main = document.createElement("div");
  main.classList.add("top-quests-grid");
  quests.forEach((q) => {
    main.append(buildTopQuestCard(q));
  });

  topQuestsWrap.append(head, main);

  return topQuestsWrap;
}

function buildTopQuestCard(quest) {
  const card = document.createElement("div");
  card.classList.add("top-quest-card");
  const questImg = document.createElement("img");
  questImg.src = quest.imageUrl;
  questImg.alt = `cover photo for quest ${quest.title}`;

  // quest info section
  const questInfo = document.createElement("div");
  questInfo.classList.add("quest-info");
  const questTitle = document.createElement("h4");
  questTitle.textContent = quest.title;
  // rewards
  const questRewards = document.createElement("div");
  questRewards.classList.add("quest-rewards");
  Object.entries(quest.xpRewards).forEach((entry) => {
    const p = document.createElement("p");
    p.textContent = `+ ${entry[1]} ${entry[0]}`;
    if (entry[1] !== 0) {
      questRewards.append(p);
    }
  });

  //categories
  const questCategories = document.createElement("div");
  questCategories.classList.add("quest-categories");
  quest.tags.forEach((tag) => {
    const p = document.createElement("p");
    p.classList.add("tag");
    p.textContent = tag;
    questCategories.append(p);
  });

  questInfo.append(questTitle, questRewards, questCategories);

  card.append(questImg, questInfo);

  // link to quest detail page
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const questId = quest._id;
    console.log(questId);
    window.location.href = `/quest/${questId}`;
  });
  return card;
}

async function populateTopQuests() {
  const popularQuests = await (await fetch("/quests/popular")).json();
  return buildTopQuests(popularQuests.data);
}

async function populateCategories() {
  const categories = await (await fetch("/quests/categories")).json();
}
