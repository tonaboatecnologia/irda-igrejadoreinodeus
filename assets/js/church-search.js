// Church Search Functionality
$(document).ready(function () {
  // Initialize Map
  var map = L.map("churchMap").setView([-8.8383, 13.2344], 13); // Default to Luanda coordinates

  // Add Tile Layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Sample Church Data (would come from backend in production)
  var churches = [
    {
      id: 1,
      name: "Catedral BOATONA",
      address: "Rua Comandante Gika, Luanda",
      pastor: "Reverendo João Baptista",
      members: 1200,
      province: "luanda",
      municipality: "luanda",
      latitude: -8.8383,
      longitude: 13.2344,
      type: "cathedral",
      phone: "+244 923 456 789",
      email: "catedral@boatona.org",
      services: [
        { day: "Domingo", time: "8h00", type: "Culto Principal" },
        { day: "Quarta", time: "18h00", type: "Estudo Bíblico" },
      ],
    },
    // More churches...
  ];

  // Populate Province Filter
  var provinces = [...new Set(churches.map((church) => church.province))];
  provinces.forEach((province) => {
    $("#provinceFilter").append(
      `<option value="${province}">${formatProvinceName(province)}</option>`
    );
  });

  // Province Filter Change
  $("#provinceFilter").change(function () {
    var province = $(this).val();
    if (province) {
      $("#municipalityFilter").prop("disabled", false);
      var municipalities = [
        ...new Set(
          churches
            .filter((church) => church.province === province)
            .map((church) => church.municipality)
        ),
      ];
      $("#municipalityFilter").html(
        '<option value="">Todos Municípios</option>'
      );
      municipalities.forEach((municipality) => {
        $("#municipalityFilter").append(
          `<option value="${municipality}">${formatMunicipalityName(
            municipality
          )}</option>`
        );
      });
    } else {
      $("#municipalityFilter")
        .prop("disabled", true)
        .html('<option value="">Selecione primeiro a província</option>');
    }
  });

  // Apply Filters
  $("#applyFilters").click(function () {
    var province = $("#provinceFilter").val();
    var municipality = $("#municipalityFilter").val();
    var pastor = $("#pastorFilter").val();

    var filteredChurches = churches.filter((church) => {
      return (
        (!province || church.province === province) &&
        (!municipality || church.municipality === municipality) &&
        (!pastor || church.pastor === pastor)
      );
    });

    displayChurches(filteredChurches);
    updateMap(filteredChurches);
  });

  // Reset Filters
  $("#resetFilters").click(function () {
    $("#provinceFilter").val("");
    $("#municipalityFilter").val("").prop("disabled", true);
    $("#pastorFilter").val("");
    displayChurches(churches);
    updateMap(churches);
  });

  // Display Churches
  function displayChurches(churchList) {
    $("#churchListContent").empty();

    if (churchList.length === 0) {
      $("#churchListContent").html(`
                <div class="no-results">
                    <i class="lnr lnr-warning"></i>
                    <p>Nenhuma igreja encontrada com os filtros atuais</p>
                </div>
            `);
      return;
    }

    churchList.forEach((church) => {
      $("#churchListContent").append(`
                <div class="church-item">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="church-image" style="background-image: url('assets/images/churches/${church.id}.jpg')"></div>
                        </div>
                        <div class="col-md-6">
                            <h4>${church.name}</h4>
                            <p class="church-address"><i class="lnr lnr-map-marker"></i> ${church.address}</p>
                            <p class="church-pastor"><i class="lnr lnr-user"></i> ${church.pastor}</p>
                            <p class="church-members"><i class="lnr lnr-license"></i> ${church.members} membros</p>
                        </div>
                        <div class="col-md-3 text-right">
                            <a href="church-detail.html?id=${church.id}" class="btn btn-primary btn-sm">Detalhes</a>
                            <button class="btn btn-link btn-sm btn-directions" data-lat="${church.latitude}" data-lng="${church.longitude}">
                                <i class="lnr lnr-map"></i> Rotas
                            </button>
                        </div>
                    </div>
                </div>
            `);
    });
  }

  // Update Map with Markers
  function updateMap(churchList) {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    if (churchList.length === 0) return;

    var bounds = [];
    churchList.forEach((church) => {
      var marker = L.marker([church.latitude, church.longitude]).addTo(map);
      marker.bindPopup(`
                <b>${church.name}</b><br>
                ${church.address}<br>
                <small>Pastor: ${church.pastor}</small>
            `);
      bounds.push([church.latitude, church.longitude]);
    });

    map.fitBounds(bounds);
  }

  // Format Province Name
  function formatProvinceName(province) {
    return province.charAt(0).toUpperCase() + province.slice(1);
  }

  // Format Municipality Name
  function formatMunicipalityName(municipality) {
    return municipality
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    }
    
  // Geolocation Button
  $("#geolocationButton").click(function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          map.setView(
            [position.coords.latitude, position.coords.longitude],
            13
          );

          // Find churches near the user
          var userLat = position.coords.latitude;
          var userLng = position.coords.longitude;

          // Simple distance calculation (would be more sophisticated in production)
          churches.forEach((church) => {
            church.distance = Math.sqrt(
              Math.pow(church.latitude - userLat, 2) +
                Math.pow(church.longitude - userLng, 2)
            );
          });

          // Sort by distance and show nearest 5
          var nearestChurches = [...churches]
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5);
          displayChurches(nearestChurches);
          updateMap(nearestChurches);

          // Show user location on map
          L.marker([userLat, userLng], {
            icon: L.divIcon({
              className: "user-location-marker",
              html: '<i class="fa fa-user"></i>',
              iconSize: [30, 30],
            }),
          })
            .addTo(map)
            .bindPopup("Sua localização");
        },
        function (error) {
          alert("Não foi possível obter sua localização: " + error.message);
        }
      );
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
    }
  });

  // Initial Load
  displayChurches(churches);
  updateMap(churches);
});
