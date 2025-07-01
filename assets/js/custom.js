$(document).ready(function () {
  // 1. Scroll To Top
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 600) {
      $(".return-to-top").fadeIn();
    } else {
      $(".return-to-top").fadeOut();
    }
  });

  $(".return-to-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });

  // 2. Carousel de Depoimentos
  $(".testimonial-carousel").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  // 3. Filtro de Portfólio
  $(".btn-filter").click(function () {
    $(".btn-filter").removeClass("active");
    $(this).addClass("active");

    var filter = $(this).data("filter");
    if (filter === "all") {
      $(".portfolio-item").fadeIn();
    } else {
      $(".portfolio-item").hide();
      $(".portfolio-item[data-category='" + filter + "']").fadeIn();
    }
  });

  // 4. Filtro de Igrejas por Localização
  $("#church-province").change(function () {
    var province = $(this).val();
    if (province) {
      $("#church-municipality").prop("disabled", false);

      // Simulação de municípios (na prática, seria via AJAX)
      var municipalities = {
        luanda: ["Belas", "Cazenga", "Viana", "Talatona"],
        benguela: ["Benguela", "Lobito", "Baía Farta"],
      };

      var options = '<option value="">Selecione o Município</option>';
      municipalities[province].forEach(function (municipality) {
        options +=
          '<option value="' +
          municipality.toLowerCase() +
          '">' +
          municipality +
          "</option>";
      });

      $("#church-municipality").html(options);
    } else {
      $("#church-municipality")
        .prop("disabled", true)
        .html('<option value="">Selecione o Município</option>');
    }
  });

  // 5. Formulários
  $("#contactForm, #donationForm").submit(function (e) {
    e.preventDefault();

    // Validação
    var valid = true;
    $(this)
      .find("[required]")
      .each(function () {
        if (!$(this).val()) {
          valid = false;
          $(this).addClass("is-invalid");
        } else {
          $(this).removeClass("is-invalid");
        }
      });

    if (valid) {
      var $btn = $(this).find("button[type='submit']");
      var btnText = $btn.html();

      $btn
        .prop("disabled", true)
        .html('<i class="fas fa-spinner fa-spin"></i> Enviando...');

      // Simulação de envio
      setTimeout(function () {
        $btn
          .html('<i class="fas fa-check"></i> Enviado!')
          .prop("disabled", false);

        // Reset após 3 segundos
        setTimeout(function () {
          $btn.html(btnText);
        }, 3000);
      }, 2000);
    }
  });

  // 6. Scroll suave para links âncora
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();

    $("html, body").animate(
      { scrollTop: $($(this).attr("href")).offset().top - 80 },
      800,
      "swing"
    );
  });

  // 7. Ativar tooltips
  $('[data-toggle="tooltip"]').tooltip();

  $(".method").click(function () {
    $(".method").removeClass("active");
    $(this).addClass("active");
    $("#paymentMethod").val($(this).data("method"));
  });
  // Timeline Animation
  $(".timeline-item").each(function (i) {
    $(this)
      .delay(i * 200)
      .animate(
        {
          opacity: 1,
          left: 0,
        },
        500
      );
  });

  // Leader Cards Hover Effect
  $(".leader-card").hover(
    function () {
      $(this).find("img").css("transform", "scale(1.05)");
    },
    function () {
      $(this).find("img").css("transform", "scale(1)");
    }
  );

  // Toggle Card Details
  $(".btn-details").click(function () {
    var target = $(this).data("target");
    $("#" + target).addClass("active");
    $(this).hide();
  });

  $(".btn-less").click(function () {
    $(this).closest(".card-details").removeClass("active");
    $(this).closest(".card").find(".btn-details").show();
  });

  // Initialize Team Slider
  $(".team-slider").owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    dots: false,
    margin: 20,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
  });

  // Animate Stats
  $(".stat-number").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).data("count"),
        },
        {
          duration: 2000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });

  // Card Hover Effect
  $(".about-card").hover(
    function () {
      $(this).find(".card-icon").css("transform", "scale(1.1)");
    },
    function () {
      $(this).find(".card-icon").css("transform", "scale(1)");
    }
  );
});
