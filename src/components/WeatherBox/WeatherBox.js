import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = (props) => {
	const [weatherData, setWeatherData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleCityChange = useCallback((city) => {
		setIsError(false);
		setIsLoading(true);
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c4fd86e01da737b5c0ea8d3a7eaeb285&units=metric`).then((res) => {
			if (res.status === 200) {
				return res.json().then((data) => {
					setWeatherData({
						city: data.name,
						temp: data.main.temp,
						icon: data.weather[0].icon,
						description: data.weather[0].main,
					});
					setIsLoading(false);
				});
			} else {
				setIsError(true);
				setIsLoading(false);
			}
		});
	}, []);

	return (
		<section>
			<PickCity handleCityChange={handleCityChange} />
			{weatherData && !isLoading && !isError && <WeatherSummary weatherData={weatherData} />}
			{isLoading && <Loader />}
			{isError && <ErrorBox>There is no such city</ErrorBox>}
		</section>
	);
};

export default WeatherBox;
