import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

// Mapbox CSS styles
import "mapbox-gl/dist/mapbox-gl.css";

const MapContainer = () => {
  const [longitude, setLongitude] = useState(6.912818);
  const [latitude, setLatitude] = useState(122.06189);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidGpheS1hbWl0MjEiLCJhIjoiY2xhMXQyMnRrMGI4ZDNxbW9qM2Z5bXpjZCJ9.iGrdH8xuF2oSG_4aoPJXzw";

    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [latitude, longitude], // Set the initial center coordinates
      zoom: 16, // Set the initial zoom level
    });

    const marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([latitude, longitude])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Marker Popup Content</h3>"))
      .addTo(map);

    return () => {
      map.remove();
      marker.remove();
    };
  }, []);

  return <div id="map-container" style={{ height: "400px" }} />;
};

export default MapContainer;
