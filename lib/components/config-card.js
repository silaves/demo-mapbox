const menCheckbox = document.getElementById('menCheckbox');
const womenCheckbox = document.getElementById('womenCheckbox');
const yearSelect = document.getElementById('yearSelect');
const viewModeRadios = document.getElementsByName('viewMode');

// Escuchar cambios en el select de año
yearSelect.addEventListener('change', function(e) {
  const selectedYear = e.target.value;
  window.options.selectedYear = selectedYear;
  window.refreshMap();
});

// Escuchar cambios en los checkboxes para el sexo
menCheckbox.addEventListener('change', function(e) {
  console.log
  window.options.isMenSelected = e.target.checked;
  window.refreshMap();
});

womenCheckbox.addEventListener('change', function(e) {
  window.options.isWomenSelected = e.target.checked;
  window.refreshMap();
});

// Escuchar cambios en los radio buttons para alternar entre 2D y 3D
viewModeRadios.forEach(radio => {
  radio.addEventListener('change', function() {
    if (this.checked) {
      if (this.value === '3d') {
        window.hide2DMap();
        window.show3DMap();
      } else if (this.value === '2d') {
        window.hide3DMap();
        window.show2DMap();
      }
    }
  });
});
