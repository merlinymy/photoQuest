import { buildQuestCard } from "../components/QuestCard.js";
import { addHeader } from "../components/utils.js";

const body = document.querySelector("body");

addHeader();
const topQuestsSection = await populateTopQuests();
if (topQuestsSection) {
  body.append(topQuestsSection);
}
populateCategories();

function buildTopQuests(quests) {
  const questList = Array.isArray(quests) ? quests : [];
  const topQuestsWrap = document.createElement("div");
  topQuestsWrap.classList.add("top-quests-wrap");

  // topQuests header
  const head = document.createElement("div");
  const sectionName = document.createElement("h3");
  sectionName.textContent = "Popular Quests";
  const viewAllBtn = document.createElement("a");
  viewAllBtn.textContent = "All Quests";
  viewAllBtn.href = "/pages/allQuests.html";
  head.append(sectionName, viewAllBtn);

  // topQuests main
  const main = document.createElement("div");
  main.classList.add("top-quests-grid");
  questList.forEach((quest) => {
    main.append(buildQuestCard(quest));
  });

  if (questList.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.classList.add("top-quests-empty");
    emptyState.textContent = "No quests available yet. Check back soon!";
    topQuestsWrap.append(head, emptyState);
    return topQuestsWrap;
  }

  topQuestsWrap.append(head, main);

  return topQuestsWrap;
}

async function populateTopQuests() {
  const popularQuests = await (await fetch("/quests/popular")).json();
  return buildTopQuests(popularQuests.data);
}

async function populateCategories() {
  const categories = await (await fetch("/quests/categories")).json();
  console.log(categories.data);
}
