import styles from './CityList.module.css';
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import {useCities} from "../context/CitiesContext.jsx";

function CityList() {
  const {cities, isLoading} = useCities();
  if (isLoading) return <Spinner />
  if (!cities.length) return <Message message="Add your first city by clickin on a city on the map" />
  return (
    <ul className={styles.cityList}>
      {cities.map(city => <CityItem key={city.id} city={city} />)}
    </ul>
  )
}

export default CityList