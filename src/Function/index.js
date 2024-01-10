const axios = require('axios');

exports.handler = async (event) => {
	// Log the event argument for debugging and for use in local development.
	console.log(JSON.stringify(event, undefined, 2));

	const apiPath = event.apiPath;

	let response;

	if (apiPath === '/weather') {
		const lat = event.parameters[0].value;
		const long = event.parameters[1].value;

		const weatherInfo = await getWeather(lat, long);
		console.log(weatherInfo);
		response = weatherInfo;
		console.log(response);
	}

	let result = {
		messageVersion: '1.0',
		response: {
			actionGroup: event.actionGroup,
			apiPath: event.apiPath,
			httpMethod: event.httpMethod,
			httpStatusCode: 200,
			responseBody: {
				'application/json': {
					body: response,
				},
			},
			sessionAttributes: {},
			promptSessionAttributes: {},
		},
	};

	console.log(result);
	return result;
};

async function getWeather(lat, long) {
	const apikey = 'XXXXXXX';
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}`;

	console.log(url);

	return axios.get(url).then((response) => {
		console.log(response.data);
		return response.data;
	});
}
