// ""

import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";

const flagemojiToPNG = (flag) => {
  // Convert flag emoji to corresponding country code
  const countryCode = [...flag]
    .map((char) =>
      String.fromCharCode(char.codePointAt() - 127397).toLowerCase()
    )
    .join("");

  // Return an image element with the country's flag
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();

  const [isLoadingGeocoding, setLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState('');

  const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

  useEffect(() => {
    async function fetchCityData() {
      try {
        setLoadingGeocoding(true);
        setGeocodingError('')
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json();

        if (!data.countryCode) throw new Error("That doesn't seem to be a valid location. Please click somewhere on the map.")
        setCityName(data.city || data.locality || 'Unknown');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode))
      } catch (error) {
        setGeocodingError(error.message)
      } finally {
        setLoadingGeocoding(false)
      }
    }

    fetchCityData()
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />

  if (geocodingError) return <Message message={geocodingError} />

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{flagemojiToPNG(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
