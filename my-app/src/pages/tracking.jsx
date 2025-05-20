import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // ← import Leaflet
import { Card, CardContent } from "../components/ui/cards";

// Custom Icons
const truckIcon = new L.Icon({
  iconUrl: "/images/truck.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const userIcon = new L.Icon({
  iconUrl: "/images/user.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default function TrackingPage() {
  const [service, setService] = useState(null);
  const [truckLocation, setTruckLocation] = useState(null);
  const [status, setStatus] = useState("Tow truck is being dispatched...");

  useEffect(() => {
    const savedService = localStorage.getItem("selectedService");
    if (savedService) setService(JSON.parse(savedService));

    // Mock locations: user fixed, truck moves closer every 3 seconds
    const userLoc = { lat: 40.7128, lng: -74.006 }; // Example: New York coords
    let truckLoc = { lat: 40.7158, lng: -74.010 }; // Starting point of truck

    setTruckLocation(truckLoc);

    const interval = setInterval(() => {
      // Move truck closer to user (simple lat/lng reduce difference)
      if (truckLoc.lat > userLoc.lat) truckLoc.lat -= 0.0005;
      if (truckLoc.lng < userLoc.lng) truckLoc.lng += 0.0005;

      setTruckLocation({ ...truckLoc });

      // When close enough, update status
      if (Math.abs(truckLoc.lat - userLoc.lat) < 0.001 && Math.abs(truckLoc.lng - userLoc.lng) < 0.001) {
        setStatus("Tow truck has arrived!");
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!service) {
    return <div className="p-4">No service selected. Please start a new request.</div>;
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <Card className="mb-4">
        <CardContent>
          <h1 className="text-xl font-bold">{service.name}</h1>
          <p>Status: <strong>{status}</strong></p>
        </CardContent>
      </Card>

      {truckLocation && (
        <MapContainer
          center={[truckLocation.lat, truckLocation.lng]}
          zoom={15}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[truckLocation.lat, truckLocation.lng]} icon={truckIcon}>
          <Popup>{service.name} Truck</Popup>
        </Marker>
        <Marker position={[40.7128, -74.006]} icon={userIcon}>
          <Popup>Your Location</Popup>
        </Marker>

        </MapContainer>
      )}
    </div>
  );
}
