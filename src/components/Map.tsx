import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
} from "@react-google-maps/api";
import Distance from "./Distance";
import Places from "./Places";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map() {
  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 41, lng: 286 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "8609ec89b75bc4b0",
      disableDefaultUI: true,
      clickableIcon: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const houses = useMemo(() => {
    if (office) return generateHouses(office);
  }, [office]);

  const fetchDirections = (house: LatLngLiteral) => {
    if (!office) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  const notify = () => {
    toast.success("Starting route!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="container">
      <div className="controls">
        <h1>Businesses near you</h1>
        <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
        {!office && <p>Enter starting location</p>}
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {office && (
            <>
              <Marker
                position={office}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />

              {houses?.map((house) => (
                <Marker
                  key={house.lat}
                  position={house}
                  onClick={() => {
                    fetchDirections(house);
                    notify();

                  }}
                />
              ))}

              <Circle center={office} radius={804.672} options={closeOptions} />
              <Circle
                center={office}
                radius={1609.34}
                options={middleOptions}
              />
              <Circle center={office} radius={3218.69} options={farOptions} />
            </>
          )}
        </GoogleMap>
        <ToastContainer theme="dark" />
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 50; i++) {
    const direction = Math.random() < 0.5 ? -35 : 35;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
