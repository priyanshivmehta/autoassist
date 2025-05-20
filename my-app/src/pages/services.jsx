import { useEffect, useState } from "react";
import { Card, CardContent } from '../components/ui/cards';
import { Button } from '../components/ui/button';
import { MapPin, Truck } from "lucide-react";

const mockServices = [
  {
    id: 1,
    name: "Speedy Tow Services",
    distance: "2.4 km",
    rating: 4.5,
    location: "Downtown Avenue",
  },
  {
    id: 2,
    name: "Reliable Haul & Tow",
    distance: "3.1 km",
    rating: 4.7,
    location: "Main Street East",
  },
  {
    id: 3,
    name: "24x7 Auto Rescue",
    distance: "4.6 km",
    rating: 4.3,
    location: "Central Boulevard",
  },
];

export default function BrowseServicesPage() {
  const [services, setServices] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Simulate location fetch
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setServices(mockServices); // Replace with API fetch later
      },
      () => {
        setServices(mockServices);
      }
    );
  }, []);

  const handleSelect = (service) => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    window.location.href = "/service-details";
  };

  return (
    <div className="ml-20 p-10 space-y-4">
      <h1 className="text-2xl font-bold">Nearby Towing Services</h1>
      {services.map((service) => (
        <Card key={service.id} className="shadow-md">
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{service.name}</h2>
              <span className="text-sm text-gray-500">⭐ {service.rating}</span>
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {service.location}
            </div>
            <div className="text-sm text-gray-600">Distance: {service.distance}</div>
            <Button className="mt-2" onClick={() => handleSelect(service)}>
              <Truck className="w-4 h-4 mr-2" /> Select Service
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 
