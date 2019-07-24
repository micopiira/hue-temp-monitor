const fetch = require('node-fetch');
const clientId = 'CHANGEME';
const clientSecret = 'CHANGEME';

// https://api.meethue.com/oauth2/auth?clientid=CHANGEME&deviceid=test&state=foo&appid=test&response_type=code

const API_ROOT = 'https://api.meethue.com';

const getAccessToken = code => 
	fetch(`${API_ROOT}/oauth2/token?code=${code}&grant_type=authorization_code`, {
		method: 'POST',
		headers: { 'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}
	}).then(res => res.json());

const pressButton = accessToken => 
	fetch(API_ROOT + '/bridge/0/config', {
		method: 'PUT',
		body: JSON.stringify({linkbutton: true}),
		headers: {
			'Authorization': 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());

const register = accessToken => fetch(API_ROOT + '/bridge/', {
	method: 'POST',
	body: JSON.stringify({devicetype: 'test'}),
	headers: {
		'Authorization': 'Bearer ' + accessToken,
		'Content-Type': 'application/json'
	}
}).then(res => res.json());

const getSensors = (username, accessToken) => 
	fetch(`${API_ROOT}/bridge/${username}/sensors`, {
		headers: {
			'Authorization': 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		}}).then(res => res.json());