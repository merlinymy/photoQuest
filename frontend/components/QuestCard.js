const STYLE_ID = "quest-card-component-styles";

function ensureQuestCardStyles() {
  if (typeof document === "undefined") {
    return;
  }
  if (document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
.entry-card {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius, 16px);
  box-shadow: var(--shadow, 0 16px 40px rgba(0, 0, 0, 0.35));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.entry-thumb-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #111;
  overflow: hidden;
}

.entry-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.entry-card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 20px 20px;
}

.entry-title {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.entry-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.8rem;
  color: var(--muted, #b8b8b8);
}

.entry-description {
  font-size: 0.85rem;
  color: var(--muted, #b8b8b8);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.73rem;
  letter-spacing: 0.35px;
  text-transform: uppercase;
  color: var(--muted, #b8b8b8);
}

.chip.accent {
  background: rgba(247, 126, 45, 0.15);
  border-color: rgba(247, 126, 45, 0.45);
  color: var(--accent, #f77e2d);
}

.chip.muted {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.08);
}

.xp-row {
  margin-top: 4px;
}

.quest-card-action {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 10, 10, 0.65);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--muted, #b8b8b8);
  cursor: pointer;
  backdrop-filter: blur(5px);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.quest-card-action:hover,
.quest-card-action:focus-visible {
  transform: translateY(-1px);
  border-color: rgba(247, 126, 45, 0.55);
  background: rgba(247, 126, 45, 0.18);
  color: var(--text, #f4f4f4);
  box-shadow: 0 12px 28px rgba(247, 126, 45, 0.25);
}

.quest-card-action svg {
  width: 14px;
  height: 14px;
  display: block;
}

.quest-card-action svg path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
`;
  document.head.appendChild(style);
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
    questId: explicitQuestId,
    onNavigate,
    showDelete = false,
    onDelete,
  } = options;

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
    explicitQuestId ??
    quest?.questId ??
    quest?._id ??
    quest?.id ??
    quest?.challengeId;

  const navigate =
    typeof onNavigate === "function"
      ? () => onNavigate(questId, quest, card)
      : () => {
          if (!questId) {
            return;
          }
          const normalizedId = String(questId);
          window.location.href = `/pages/quest.html?id=${encodeURIComponent(normalizedId)}`;
        };

  if (showDelete || typeof onDelete === "function") {
    card.dataset.deletable = "true";
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "quest-card-action quest-card-action--delete";
    deleteButton.setAttribute(
      "aria-label",
      title ? `Delete quest: ${title}` : "Delete quest"
    );
    deleteButton.innerHTML = `
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M2 4h12" />
        <path d="M6 1h4a1 1 0 0 1 1 1v2H5V2a1 1 0 0 1 1-1Z" />
        <path d="M5 6v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6" />
        <path d="M7 6v5" />
        <path d="M9 6v5" />
      </svg>
    `;
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (typeof onDelete === "function") {
        const result = onDelete(questId, quest, card, event);
        if (result instanceof Promise) {
          result.then((value) => {
            if (value !== false) {
              card.remove();
            }
          });
        } else if (result !== false) {
          card.remove();
        }
        return;
      }
      const deleteEvent = new CustomEvent("quest:delete-requested", {
        bubbles: true,
        cancelable: true,
        detail: {
          questId,
          quest,
          card,
          triggerEvent: event,
          remove: () => card.remove(),
        },
      });
      const shouldRemove = card.dispatchEvent(deleteEvent);
      if (shouldRemove) {
        card.remove();
      }
    });
    card.appendChild(deleteButton);
  }

  if (questId || typeof onNavigate === "function") {
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
