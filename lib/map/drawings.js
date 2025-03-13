/**
 * Build the bars to display on the map according to the current data.
 * @returns - Array of polygons to display on the map.
 */
function buildBars() {
  const drawings = [];

  for (const province of window.provinces) {
    for (const town of province.towns) {
      for (const municipality of town.municipalities) {
        let polygonData = town.coordinates[municipality.idMunicipio];
        let height = 0;

        if (!polygonData) {
          continue;
        }
        
        if (window.options.isMenSelected && window.options.isWomenSelected) {
          height = municipality.hombres[window.options.selectedYear] + municipality.mujeres[window.options.selectedYear];
        } else if (window.options.isMenSelected) {
          height = municipality.hombres[window.options.selectedYear];
        } else if (window.options.isWomenSelected) {
          height = municipality.mujeres[window.options.selectedYear];
        }

        const polygonGeometry = polygonData.features[0].geometry;
        const polygon = {
          id: municipality.idMunicipio,
          type: 'Feature',
          geometry: {
            type: polygonGeometry.type,
            coordinates: polygonGeometry.coordinates,
          },
          properties: {
            height: height,
            name: municipality.nombreMunicipio,
            year: window.options.selectedYear,
            isMenSelected: window.options.isMenSelected,
            isWomenSelected: window.options.isWomenSelected,
            men: municipality.hombres[window.options.selectedYear],
            women: municipality.mujeres[window.options.selectedYear],
          }
        };
        drawings.push(polygon);
      }
    }
  }
  return drawings;
}

/**
 * Refresh the map with the new data.
 * @returns void
 */
function refreshMap() {
  window.geojsonData.features = buildBars();
  window.map.getSource('bars').setData(window.geojsonData);
}

window.refreshMap = refreshMap;
window.buildBars = buildBars;