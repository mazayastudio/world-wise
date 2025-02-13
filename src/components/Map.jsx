import styles from './Map.module.css';
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../context/CitiesContext.jsx";
import {useGeolocation} from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";

function Map() {
  const {cities} = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0])
  const [searchParams] = useSearchParams();
  const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();

  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) setMapPosition(
      [geolocationPosition.lat, geolocationPosition.lng]
    );
  }, [geolocationPosition])

  const flagemojiToPNG = (flag) => {
    const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char - 127397).toLowerCase()).join('');
    return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
  }

  return (
    <div className={styles.mapContainer}>
      <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Use my position'}
      </Button>
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => <Marker
          position={[city.position.lat, city.position.lng]}
          key={[city.position.lat, city.position.lng]}
        >
          <Popup>
            <span>{flagemojiToPNG(city.emoji)}</span> <span>{city.cityName}</span>
          </Popup>
        </Marker>)}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({position}) {
  if (!position[0] || !position[1]) return null;
  const map = useMap()
  map.setView(position)
  return null;
}

function DetectClick() {
  const navigate = useNavigate()

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}

export default Map