import * as axios from 'axios';

const axiosConfig = {
  // eslint-disable-next-line no-undef
  baseURL: SERVER_CONFIGURATION.baseUrl,
};
export const API = {
  axiosInstance: axios.create(axiosConfig),
  // eslint-disable-next-line no-undef
  configureUrl: (url) => `${SERVER_CONFIGURATION.baseUrl}${url}`,
  post: (url, data) => fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  }),
  get: (url, data) => {
    const params = Object.keys(data).map((key) => `${key}=${data[key]}`).join('&');
    const urlWithParams = params ? `${url}?${params}` : url;
    return fetch(urlWithParams);
  },
  retrieveEventsForDuration: async (startDate, endDate) => {
    const data = {
      datetime__gte: `${startDate} 00:00`,
      datetime__lte: `${endDate} 23:59`,
    };
    const response = await API.get(API.configureUrl('records/'), data);
    return response.json();
  },
  retrieveEventsForDay: async (day) => {
    const data = {
      datetime__gte: `${day} 00:00`,
      datetime__lte: `${day} 23:59`,
    };
    const response = await API.get(API.configureUrl('records/'), data);
    return response.json();
  },
  submit: async (data) => {
    const response = await API.post(API.configureUrl('records/'), data);
    return response.json();
  },
};

export default API;
