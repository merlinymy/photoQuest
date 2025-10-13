const STYLE_ID = "quest-card-component-styles";

function ensureQuestCardStyles() {
  if (typeof document === "undefined") {
    return;
  }
  if (document.getElementById(STYLE_ID)) {
    return;
  }
}

ensureQuestCardStyles();

export function formatNumber(value) {
  return Number(value ?? 0).toLocaleString();
}

export function prettifySkillName(key) {
  if (!key) return "";
  const spaced = key.replace(/([A-Z])/g, " $1");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function createChipRow(items, variant) {
  if (!items || !items.length) {
    return null;
  }

  const row = document.createElement("div");
  row.className = "chip-row";

  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    if (variant) {
      chip.classList.add(variant);
    }
    chip.textContent = item;
    row.appendChild(chip);
  });

  return row;
}

export function formatDateRange(start, end) {
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isValid = (date) =>
    date instanceof Date && !Number.isNaN(date.getTime());

  const hasStart = startDate && isValid(startDate);
  const hasEnd = endDate && isValid(endDate);

  if (hasStart && hasEnd) {
    return `${formatter.format(startDate)} – ${formatter.format(endDate)}`;
  }

  if (hasStart) {
    return formatter.format(startDate);
  }

  if (hasEnd) {
    return formatter.format(endDate);
  }

  return "Dates TBA";
}

export function buildQuestCard(quest, options = {}) {
  ensureQuestCardStyles();

  const {
    title,
    description,
    imageUrl,
    xpRewards = {},
    startAt,
    endAt,
    counters = {},
    tags = [],
  } = quest ?? {};

  const card = document.createElement("article");
  card.className = "entry-card quest-card";

  const thumbWrapper = document.createElement("div");
  thumbWrapper.className = "entry-thumb-wrapper";

  const thumb = document.createElement("img");
  thumb.className = "entry-thumb";
  thumb.src =
    imageUrl || "https://dummyimage.com/1600x900/181818/ffffff&text=Quest";
  thumb.alt = title ? `${title} quest cover` : "Quest cover";
  thumbWrapper.appendChild(thumb);

  const body = document.createElement("div");
  body.className = "entry-card-body";

  const titleEl = document.createElement("h3");
  titleEl.className = "entry-title";
  titleEl.textContent = title || "Untitled Quest";

  const meta = document.createElement("div");
  meta.className = "entry-meta";

  const dateSpan = document.createElement("span");
  dateSpan.textContent = formatDateRange(startAt, endAt);
  meta.appendChild(dateSpan);

  if (typeof counters.submissions === "number") {
    const submissionSpan = document.createElement("span");
    submissionSpan.textContent = `${formatNumber(counters.submissions)} submissions`;
    meta.appendChild(submissionSpan);
  }

  body.append(titleEl, meta);

  if (description) {
    const descriptionEl = document.createElement("p");
    descriptionEl.className = "entry-description";
    descriptionEl.textContent = description;
    body.appendChild(descriptionEl);
  }

  const xpChips = Object.entries(xpRewards || {})
    .filter(([, value]) => value)
    .map(([skill, value]) => `+${value} ${prettifySkillName(skill)}`);
  const xpRow = createChipRow(xpChips.slice(0, 4), "accent");
  if (xpRow) {
    xpRow.classList.add("xp-row");
    body.appendChild(xpRow);
  }

  const tagsRow = createChipRow(
    (tags || []).slice(0, 6).map((tag) => `#${tag}`),
    "muted"
  );
  if (tagsRow) {
    body.appendChild(tagsRow);
  }

  card.append(thumbWrapper, body);

  const questId =
    options.questId ??
    quest?.questId ??
    quest?._id ??
    quest?.id ??
    quest?.challengeId;

  const navigate =
    typeof options.onNavigate === "function"
      ? () => options.onNavigate(questId, quest, card)
      : () => {
          if (!questId) {
            return;
          }
          const normalizedId = String(questId);
          window.location.href = `/pages/quest.html?id=${encodeURIComponent(normalizedId)}`;
        };

  if (questId || typeof options.onNavigate === "function") {
    card.dataset.questId = questId != null ? String(questId) : "";
    card.tabIndex = 0;
    card.setAttribute("role", "link");
    if (title) {
      card.setAttribute("aria-label", `View quest: ${title}`);
    }
    card.addEventListener("click", (event) => {
      event.preventDefault();
      navigate();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        navigate();
      }
    });
  }

  return card;
}
