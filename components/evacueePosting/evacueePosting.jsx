import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Button } from "@mui/material";

const EvacueePosting = ({ onSubmit, home, setHome }) => {
  const [data, setData] = useState([]);
  const [locationInfo, setLocationInfo] = useState(null);
  const [state, setState] = useState({ address: "" });

  const [postCenter, setPostCenter] = useState({
    lat: 49.2835,
    lng: -123.1153,
  });
  const [selected, setSelected] = useState(false);
  const [center, setCenter] = useState({ lat: 49.2835, lng: -123.1153 });

  const nasaApiKey = process.env.NEXT_PUBLIC_NASA_API;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
    libraries: ["places"],
  });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://eonet.gsfc.nasa.gov/api/v3/events"
      );
      const { events } = response.data;
      setData(events);
    })();
  }, []);

  const fireMarkers = data.map(item => {
    if (item.categories[0].id === "wildfires") {
      return (
        <div key={item.id}>
          <Marker
            key={item.id}
            position={{
              lat: item.geometry[0].coordinates[1],
              lng: item.geometry[0].coordinates[0],
            }}
            icon={{
              url: "/fire_icon.png",
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setLocationInfo({
                id: item.id,
                title: item.title,
                lat: item.geometry[0].coordinates[1],
                lng: item.geometry[0].coordinates[0],
              });
            }}
          />
        </div>
      );
    }
    return null;
  });
  const submitHandler = e => {
    e.preventDefault();
    onSubmit({
      country: state.address.split(",")[state.address.split(",").length - 1],
      province: state.address.split(",")[state.address.split(",").length - 2],
      city: state.address.split(",")[state.address.split(",").length - 3],
      address: state.address,
      lat: home.lat,
      lng: home.lng,
    });
    router.push("/Dashboard");
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setHome({ ...home, lat: latLng.lat, lng: latLng.lng }))
      .catch(error => console.error("Error", error));
  };
  const findmylocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          animation: google.maps.Animation.DROP,
        });
        setSelected(true);
      });
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  };

  const containerStyle = {
    width: "1000px",
    height: "800px",
  };

  if (loadError) {
    return "Error loading maps";
  }
  if (!isLoaded) return <div>Loading Maps</div>;
  return (
    <div>
      <div>
        <button onMouseDown={findmylocation}>Current Location</button>
      </div>
      <form onSubmit={submitHandler}>
        <PlacesAutocomplete
          value={state.address}
          onChange={address => setState({ address })}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places",
                  className: "location-search-input",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  // console.log(suggestion);
                  // setHome({ ...home, address: suggestion.description });
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      key={suggestion.description}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span
                        onClick={e =>
                          setState({ address: e.currentTarget.innerHTML })
                        }
                      >
                        {suggestion.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <button type="submit">Submit</button>
      </form>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 49.2835, lng: -123.1153 }}
        zoom={5}
      >
        {fireMarkers ? fireMarkers : null}

        {home &&
          home.map((item, index) => (
            <div key={index}>
              <Marker
                key={item.lat}
                position={{ lat: item.lat, lng: item.lng }}
                icon={{
                  url: "/vector.svg",
                  scaledSize: new window.google.maps.Size(40, 40),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                onClick={() => {
                  setLocationInfo({
                    id: item.id,
                    title: (
                      <Button variant="outlined" href={`/home/${item.id}`}>
                        {
                          /* {  {item.addressLine1 ? item.addressLine1 : null}
                        {item.description ? item.description : null}} */
                          {
                            address: item.addressLine1,
                            description: item.description,
                          }
                        }
                      </Button>
                    ),
                    lat: item.lat,
                    lng: item.lng,
                  });
                  // onClick={() => {
                  //   router.push(`/home/${item.id}`);
                  // }}
                }}
              />
            </div>
          ))}
        <div>
          <Marker
            position={{ lat: postCenter.lat, lng: postCenter.lng }}
            icon={{
              url: "/current_location.svg",
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        </div>
        {locationInfo && (
          <InfoWindow
            position={{ lat: locationInfo.lat, lng: locationInfo.lng }}
            onCloseClick={() => {
              setLocationInfo(null);
            }}
          >
            <div>
              <h2>{locationInfo.title.address}</h2>
              <h2>{locationInfo.title.description}</h2>
            </div>
          </InfoWindow>
        )}
        {selected ? (
          <Marker
            key={center.id}
            position={{ lat: center.lat, lng: center.lng }}
            icon={{
              url: "/current_location.svg",
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        ) : null}
      </GoogleMap>
    </div>
  );
};
export default EvacueePosting;