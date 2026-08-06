(function () {
  var cardsRoot = document.getElementById("messageCards");
  var template = document.getElementById("cardTemplate");
  var chatScreen = document.getElementById("chatScreen");
  var campusScreen = document.getElementById("campusScreen");
  var MINUTES_PER_DAY = 24 * 60 * 60 * 1000;

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function formatDate(date) {
    return [
      date.getFullYear(),
      pad(date.getMonth() + 1),
      pad(date.getDate())
    ].join("-");
  }

  function shiftedDate(baseDate, offsetDays) {
    return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + offsetDays);
  }

  function dailyStableTime(date) {
    var daySerial = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MINUTES_PER_DAY);
    var startMinutes = 9 * 60;
    var endMinutes = 11 * 60 + 50;
    var range = endMinutes - startMinutes + 1;
    var minutes = startMinutes + ((daySerial * 37 + 23) % range);

    return pad(Math.floor(minutes / 60)) + ":" + pad(minutes % 60);
  }

  function appendTimeLabel(time) {
    var label = document.createElement("div");
    label.className = "message-time";
    label.textContent = time;
    cardsRoot.appendChild(label);
  }

  function appendMessage(message) {
    var fragment = template.content.cloneNode(true);
    var card = fragment.querySelector(".message-card");

    fragment.querySelector(".venue").textContent = message.venue;
    fragment.querySelector(".reservation-time").textContent = formatDate(message.date) + " " + message.time;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", showCampusScreen);
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showCampusScreen();
      }
    });
    cardsRoot.appendChild(fragment);
  }

  function dailyMessages(date) {
    return [
      { venue: "深圳校区游泳池-场地1", date: date, time: "16:30" },
      { venue: "深圳校区健身房-场地1", date: date, time: "16:00" }
    ];
  }

  function renderMessages() {
    var today = new Date();
    var todayOnly = shiftedDate(today, 0);
    var messageGroups = [
      { label: "10:08", date: shiftedDate(today, -3) },
      { label: "12:01", date: shiftedDate(today, -2) },
      { label: "12:50", date: shiftedDate(today, -1) },
      { label: dailyStableTime(todayOnly), date: todayOnly }
    ];

    cardsRoot.textContent = "";

    messageGroups.forEach(function (group) {
      appendTimeLabel(group.label);
      dailyMessages(group.date).forEach(appendMessage);
    });
  }

  function showCampusScreen(updateHash) {
    chatScreen.classList.add("is-hidden");
    campusScreen.classList.remove("is-hidden");
    campusScreen.querySelector(".campus-content").scrollTop = 0;
    if (updateHash !== false && window.location.hash !== "#campus") {
      window.location.hash = "campus";
    }
  }

  function showChatScreen() {
    campusScreen.classList.add("is-hidden");
    chatScreen.classList.remove("is-hidden");
    if (window.location.hash === "#campus") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  document.querySelectorAll("[data-return-chat]").forEach(function (button) {
    button.addEventListener("click", showChatScreen);
  });

  renderMessages();

  if (window.location.hash === "#campus") {
    showCampusScreen(false);
  }
})();
