// Portfolio Filter
$(document).ready(function(){
  // Portfolio filter
  $(".btn-filter").click(function () {
    $(".btn-filter").removeClass("active");
    $(this).addClass("active");

    var filter = $(this).data("filter");
    if (filter == "all") {
      $(".portfolio-item").show();
    } else {
      $(".portfolio-item").hide();
      $('.portfolio-item[data-category="' + filter + '"]').show();
    }
  });

  // Copy IBAN
  new ClipboardJS(".copy-iban");
  $(".copy-iban").click(function () {
    $(this).html('<i class="fa fa-check"></i> Copiado!');
    setTimeout(() => {
      $(this).html('<i class="fa fa-copy"></i> Copiar IBAN');
    }, 2000);
  });

  // Form validation
  (function () {
    "use strict";
    window.addEventListener(
      "load",
      function () {
        var forms = document.getElementsByClassName("needs-validation");
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener(
            "submit",
            function (event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );
  })();

  // WhatsApp donation confirmation
  $("#donationForm").submit(function (e) {
    e.preventDefault();
    if (this.checkValidity()) {
      var name = $("#donorName").val();
      var amount = $("#donationAmount").val();
      var phone = $("#donorEmail").val();

      // Check if it's a phone number (Angolan format)
      if (phone.match(/^(\+244|00244)?[9][1-9][0-9]{7}$/)) {
        var whatsappMsg = `Olá BOATONA, eu ${name} acabei de fazer uma doação de ${amount} AOA. Aqui está o comprovativo:`;
        var whatsappUrl = `https://wa.me/244923456789?text=${encodeURIComponent(
          whatsappMsg
        )}`;
        window.open(whatsappUrl, "_blank");
      } else {
        // If it's email, show success message
        alert("Obrigado por sua doação! Enviaremos uma confirmação por email.");
      }
    }
  });

  // Ministries Filter
  $(document).ready(function () {
    // Filter ministries
    $(".ministry-filter .btn-filter").click(function () {
      $(".ministry-filter .btn-filter").removeClass("active");
      $(this).addClass("active");

      var filter = $(this).data("filter");
      if (filter === "all") {
        $(".ministry-item").fadeIn();
      } else {
        $(".ministry-item").hide();
        $(`.ministry-item[data-category="${filter}"]`).fadeIn();
      }
    });

    // Initialize calendar
    initEventCalendar();

    // Filter events
    $(".event-filters .btn-filter").click(function () {
      $(".event-filters .btn-filter").removeClass("active");
      $(this).addClass("active");

      var filter = $(this).data("filter");
      if (filter === "all") {
        $(".event-item").fadeIn();
      } else {
        $(".event-item").hide();
        $(`.event-item[data-category="${filter}"]`).fadeIn();
      }
    });

    // Contact form validation
    $("#contactForm").submit(function (e) {
      e.preventDefault();
      if (this.checkValidity()) {
        alert("Mensagem enviada com sucesso! Entraremos em contacto em breve.");
        this.reset();
      }
      $(this).addClass("was-validated");
    });

    // Initialize contact map
    var contactMap = L.map("contactMap").setView([-8.8383, 13.2344], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      contactMap
    );

    // Add church markers (in a real app, these would come from backend)
    var churches = [
      { name: "Catedral BOATONA", lat: -8.8383, lng: 13.2344 },
      // More churches...
    ];

    churches.forEach((church) => {
      L.marker([church.lat, church.lng])
        .addTo(contactMap)
        .bindPopup(`<b>${church.name}</b>`);
    });
  });

  function initEventCalendar() {
    // Simplified calendar initialization
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    let calendarHTML = "";

    // Add day names
    days.forEach((day) => {
      calendarHTML += `<div class="calendar-day-header">${day}</div>`;
    });

    // Add days (simplified)
    for (let i = 1; i <= 30; i++) {
      const hasEvent = [5, 12, 15, 20].includes(i);
      calendarHTML += `
            <div class="calendar-day ${hasEvent ? "event" : ""} ${
        i === 15 ? "active" : ""
      }">
                ${i}
            </div>
        `;
    }

    $("#eventCalendar").html(calendarHTML);
  }
});