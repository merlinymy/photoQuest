import { addHeader } from "../components/utils.js";

addHeader();
let skip = 0;
let limit = 20;

const questId = new URLSearchParams(window.location.search).get("id");

const questInfo = await (await fetch(`/quest/${questId}`)).json();

const creatorId = questInfo.data[0].creatorId;
const submissionWrapper = buildQuestPage();
getInitialSubmissions();

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    getMoreSubmissions();
  }
});
async function getInitialSubmissions() {
  const submissions = await getSubmissions(questId, skip, limit);
  populateSubmissions(submissions);
  skip += limit;
}

async function getMoreSubmissions() {
  const submissions = await getSubmissions(questId, skip, limit);
  populateSubmissions(submissions);
  skip += limit;
}
function populateSubmissions(submissions) {
  if (submissions && submissions.length > 0) {
    submissions.forEach((submission) => {
      const { title, imageUrl, userId, createdAt, exif, counters } = submission;
      const submissionCard = document.createElement("div");
      submissionCard.classList.add("submission-card");

      const imgEle = document.createElement("img");
      imgEle.classList.add("submission-image");
      imgEle.src = imageUrl;
      imgEle.alt = title;
      submissionCard.appendChild(imgEle);

      const submissionInfo = document.createElement("div");
      submissionInfo.classList.add("submission-info");

      const titleEle = document.createElement("h3");
      titleEle.innerText = title;
      submissionInfo.appendChild(titleEle);

      const creatorEle = document.createElement("p");
      creatorEle.innerText = `By: ${userId.split("-")[0]}`;
      submissionInfo.appendChild(creatorEle);

      const dateEle = document.createElement("p");
      dateEle.innerText = `Submitted on: ${new Date(
        createdAt
      ).toLocaleDateString()}`;
      submissionInfo.appendChild(dateEle);

      const likesEle = document.createElement("p");
      likesEle.innerText = `Likes: ${counters.likes || 0}`;
      submissionInfo.appendChild(likesEle);

      if (exif) {
        const exifEle = document.createElement("p");
        exifEle.innerText = `Camera: ${exif.camera}, f/${exif.f}, ISO ${
          exif.iso
        }, Shutter: ${exif.shutter}, Focal: ${exif.focal}mm`;
        submissionInfo.appendChild(exifEle);
      }

      submissionCard.appendChild(submissionInfo);
      submissionWrapper.appendChild(submissionCard);
    });
  }
}

async function getSubmissions(questId, skip, limit) {
  const response = await fetch(
    `/submissions/byQuestId/${questId}?skip=${skip}&limit=${limit}`
  );
  return response.json();
}

function buildQuestPage() {
  buildQuestSection();
  const submissionWrapper = buildSubmissionsSection();
  return submissionWrapper;
}

function buildQuestSection() {
  const { title, description, imageUrl, tags, tip, xpRewards, startAt, endAt } =
    questInfo.data[0];
  console.log({
    title,
    description,
    imageUrl,
    tags,
    tip,
    xpRewards,
    startAt,
    endAt,
  });
  const questSection = document.createElement("section");
  questSection.classList.add("quest-section");
  questSection.id = "quest-section";
  document.body.appendChild(questSection);

  const questTextInfo = document.createElement("div");
  questTextInfo.classList.add("quest-text-info");

  const questTags = document.createElement("div");
  questTags.classList.add("quest-tags");
  tags.forEach((tag) => {
    const tagEle = document.createElement("span");
    tagEle.classList.add("quest-tag");
    tagEle.innerText = `${tag}`;
    questTags.appendChild(tagEle);
  });
  questSection.append(questTags, questTextInfo);

  const questsxpRewards = document.createElement("div");
  questsxpRewards.classList.add("quest-xp-rewards");
  xpRewards &&
    Object.entries(xpRewards).forEach(([key, value]) => {
      const xpEle = document.createElement("span");
      xpEle.classList.add("quest-xp-reward");
      xpEle.innerText = `${key}: ${value}`;
      questsxpRewards.appendChild(xpEle);
    });
  questSection.appendChild(questsxpRewards);

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("quest-image-container");
  questSection.appendChild(imgContainer);
  const imgEle = document.createElement("img");
  imgEle.classList.add("quest-image");
  imgEle.src = imageUrl;
  imgEle.alt = title;
  imgContainer.appendChild(imgEle);
  questSection.appendChild(imgContainer);

  const titleEle = document.createElement("h1");
  titleEle.innerText = title;
  questTextInfo.appendChild(titleEle);

  const descEle = document.createElement("p");
  descEle.innerText = description;
  questTextInfo.appendChild(descEle);

  const tipEle = document.createElement("p");
  tipEle.innerText = `Tip: ${tip}`;
  questTextInfo.appendChild(tipEle);

  const creator = document.createElement("p");
  creator.classList.add("quest-creator");
  creator.innerText = `by: ${creatorId.split("-")[0]}`;
  questTextInfo.appendChild(creator);

  const endAtEle = document.createElement("p");
  endAtEle.classList.add("quest-end-at");
  endAtEle.innerText = `Ends at: ${new Date(endAt).toLocaleString().split(", ")[0]}`;
  questTextInfo.appendChild(endAtEle);

  return questSection;
}

//  Example submission object

// {
//     "_id": "s_0005673",
//     "challengeId": "192db462-1412-4243-8dd0-5091a3ad23c7",
//     "userId": "eee98b60-f81b-4b03-bafb-dcd7c9209728",
//     "title": "Silent Minimalist",
//     "imageUrl": "https://dummyimage.com/1600x900/444444/ffffff&text=Neon+s_0005673",
//     "counters": {
//         "likes": 21
//     },
//     "createdAt": "2025-10-18T19:33:06Z",
//     "exif": {
//         "camera": "Sony A7C",
//         "f": 12,
//         "iso": 500,
//         "shutter": "1/100",
//         "focal": 16
//     }
// }
function buildSubmissionsSection() {
  const submissionsSection = document.createElement("section");
  submissionsSection.classList.add("submissions-section");
  submissionsSection.id = "submissions-section";
  document.body.appendChild(submissionsSection);

  const submissionWrapper = document.createElement("div");
  submissionWrapper.classList.add("submission-wrapper");
  submissionsSection.appendChild(submissionWrapper);

  return submissionWrapper;
}
