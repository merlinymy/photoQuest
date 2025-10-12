import { supabase } from "../lib/supabaseClient.js";
import { addHeader } from "../components/utils.js";

addHeader();

const form = document.getElementById("quest-form");
const submitButton = form.querySelector(".primary-button");
submitButton.addEventListener("click", async (e) => {
  form.checkValidity();
  form.reportValidity();
  e.preventDefault();
  const formData = new FormData(form);
  console.log(formData.get("title"));
  const title = formData.get("title").trim();
  const description = formData.get("description").trim();
  const tags = formData
    .get("tags")
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
  const xpRewards = {};
  xpRewards.composition = parseInt(formData.get("xpRewards.composition"), 10);
  xpRewards.lighting = parseInt(formData.get("xpRewards.lighting"), 10);
  xpRewards.editing = parseInt(formData.get("xpRewards.editing"), 10);
  xpRewards.storyTelling = parseInt(formData.get("xpRewards.storyTelling"), 10);
  xpRewards.techniques = parseInt(formData.get("xpRewards.techniques"), 10);
  const tip = formData.get("tip").trim();
  const expiresIn = formData.get("expiry");

  const imageFile = formData.get("image");
  let imageUrl = null;
  if (imageFile && imageFile.size > 0) {
    const { data, error } = await supabase.storage
      .from("photoQuestImage")
      .upload(imageFile.name, imageFile);
    if (error) {
      console.error("Error uploading image:", error);
    } else {
      imageUrl = supabase.storage
        .from("photoQuestImage")
        .getPublicUrl(data.path).data.publicUrl;
      console.log("Public URL:", imageUrl);
    }
  }
  const response = await fetch("/quests/newQuest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      creatorId: window.localStorage.getItem("userId"),
      xpRewards,
      endAt: expiresIn,
      tags,
      counters: { submissions: 0 },
      imageUrl,
      tip,
    }),
  });
  const result = await response.json();
  if (result.status === "success") {
    // Redirect to dashboard
    window.location.href = "/pages/dashboard.html";
  } else {
    console.log("Error creating quest:", result.message);
  }
});
