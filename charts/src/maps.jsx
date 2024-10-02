import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import germanyGeoJson from './assets/custom.geo-2.json'

// Hier verlinken wir zu den GeoJSON-Daten (lokal oder online)
const geoUrl = germanyGeoJson;

const GermanyMap = () => {
  const [selectedState, setSelectedState] = useState(null);

  return (
    <div>
      <h1>Deutschland Karte</h1>
      {selectedState && <p>Geklicktes Bundesland: {selectedState}</p>}

      <ComposableMap height={1600} width={400} projection="geoMercator">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const { NAME_1 } = geo.properties;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => setSelectedState(NAME_1)}
                  style={{
                    default: { fill: "#D6D6DA", outline: "none" },
                    hover: { fill: "#F53", outline: "none" },
                    pressed: { fill: "#E42", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default GermanyMap;
