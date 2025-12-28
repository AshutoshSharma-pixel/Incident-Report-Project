import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { upvoteIncident } from "../services/api";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Severity icons
const severityIcons = {
  1: new L.Icon({
    iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/green.png",
    iconSize: [32, 32],
  }),
  2: new L.Icon({
    iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/yellow.png",
    iconSize: [32, 32],
  }),
  3: new L.Icon({
    iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red.png",
    iconSize: [32, 32],
  }),
};

// Map click handler
function ClickReporter({ onSelectLocation }) {
  useMapEvents({
    click(e) {
      if (onSelectLocation) {
        onSelectLocation(e.latlng);
      }
    },
  });
  return null;
}

export default function MapView({ incidents, onSelectLocation }) {
  return (
    <div style={{ width: "100%" }}>
      {/* Severity legend */}
      <div
        style={{
          marginBottom: "10px",
          fontSize: "14px",
          opacity: 0.8,
        }}
      >
        <b>Severity:</b>{" "}
        <span style={{ color: "green" }}>● Low</span>{" "}
        <span style={{ color: "orange" }}>● Medium</span>{" "}
        <span style={{ color: "red" }}>● High</span>
      </div>

      <MapContainer
        center={[28.61, 77.2]}
        zoom={10}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "16px",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {incidents.map((i) => (
          <Marker
            key={i.id}
            position={[i.location.lat, i.location.lng]}
            icon={severityIcons[i.severity] || severityIcons[1]}
          >
            <Popup>
              <b>{i.type}</b>
              <br />
              {i.description}
              <br />
              Upvotes: {i.upvotes}
              <br />
              <button
                style={{
                  marginTop: "6px",
                  cursor: "pointer",
                }}
                onClick={() => upvoteIncident(i.id)}
              >
                👍 Upvote
              </button>
            </Popup>
          </Marker>
        ))}

        <ClickReporter onSelectLocation={onSelectLocation} />
      </MapContainer>
    </div>
  );
}
