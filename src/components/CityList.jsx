import styles from './CityList.module.css';
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";

function CityList({cities, isLoading}) {
  if (isLoading) return <Spinner />
  if (!cities.length) return <Message message="No cities found" />
  return (
    <ul className={styles.cityList}>
      {cities.map(city => <CityItem key={city.id} city={city} />)}
    </ul>
  )
}

export default CityList