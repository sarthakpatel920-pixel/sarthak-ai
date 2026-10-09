const chat = document.getElementById("chat");
const form = document.getElementById("chatForm");
const input = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const welcome = document.getElementById("welcome");
const sidebar = document.querySelector(".sidebar");

function addBubble(text, who) {
  if (welcome && welcome.isConnected) welcome.remove();
  const bubble = document.createElement("div");
  bubble.className = `bubble ${who}`;
  bubble.textContent = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
  return bubble;
}
async function sendMessage(text) {
  text = (text || "").trim();
  if (!text || sendBtn.disabled) return;
  addBubble(text, "user");
  input.value = "";
  input.style.height = "auto";
  sendBtn.disabled = true;
  const waiting = addBubble("Thinking…", "assistant typing");
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    const data = await response.json();
    waiting.classList.remove("typing");
    waiting.textContent = data.reply || data.error || "Something went wrong.";
    if (!response.ok) waiting.classList.add("error");
  } catch {
    waiting.classList.remove("typing");
    waiting.classList.add("error");
    waiting.textContent = "Could not connect. Check your internet and try again.";
  } finally {
    sendBtn.disabled = false;
    input.focus();
    chat.scrollTop = chat.scrollHeight;
  }
}
form.addEventListener("submit", e => { e.preventDefault(); sendMessage(input.value); });
input.addEventListener("input", () => { input.style.height = "auto"; input.style.height = Math.min(input.scrollHeight, 180) + "px"; });
input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } });
document.querySelectorAll("[data-prompt]").forEach(btn => btn.addEventListener("click", () => sendMessage(btn.dataset.prompt)));
document.getElementById("newChat").addEventListener("click", () => {
  chat.innerHTML = "";
  chat.appendChild(welcome);
  welcome.style.display = "";
  input.value = "";
  sidebar.classList.remove("open");
});
document.getElementById("menuBtn").addEventListener("click", () => sidebar.classList.toggle("open"));
