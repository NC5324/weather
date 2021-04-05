class TestService {

    async getData(city, apiKey) {
        return await $.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    }

    async getForecast(city, apiKey) {
        return await $.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    }
}
export default new TestService()