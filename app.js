(function () {
  var cardsRoot = document.getElementById("messageCards");
  var template = document.getElementById("cardTemplate");

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

  function renderMessages() {
    var today = new Date();
    var yesterday = shiftedDate(today, -1);
    var todayOnly = shiftedDate(today, 0);

    var messages = [
      { venue: "深圳校区游泳池-场地1", date: yesterday, time: "16:30" },
      { venue: "深圳校区健身房-场地1", date: yesterday, time: "16:00" },
      { venue: "深圳校区游泳池-场地1", date: todayOnly, time: "16:30" },
      { venue: "深圳校区健身房-场地1", date: todayOnly, time: "16:00" }
    ];

    cardsRoot.textContent = "";
    messages.forEach(function (message) {
      var fragment = template.content.cloneNode(true);
      fragment.querySelector(".venue").textContent = message.venue;
      fragment.querySelector(".reservation-time").textContent = formatDate(message.date) + " " + message.time;
      cardsRoot.appendChild(fragment);
    });
  }

  renderMessages();
})();
