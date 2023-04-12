import React, {Component} from "react";
import api from "../services/api";

class GetCountries extends Component {

    state = {
        countries: [],
        isLoading: true,
    }

    componentDidMount() {
        const countryPromise = api.get('/countries/');
        const continentPromise = api.get('/continents/');

        Promise.all([countryPromise, continentPromise])
            .then(res => {
                const countries = res[0].data;
                const continents = res[1].data;

                const complete = countries.map(country => {
                    const contObj = continents.find(cont => cont.id === country.continent);
                    return { ...country, contObj };
                })
                this.setState({countries: complete, isLoading: false});
            })
    }

    render() {
        const { isLoading, countries } = this.state;
        
        if (isLoading) {
            return <div>Carregando...</div>;
        }
        
        return (
            <div>
                <h1>Lista dos países com suas respectivas capitais...</h1>
                <ul>
                    {this.state.countries.map(item => (
                        <li key={item.id}>{item.name} - {item.capital} - {item.contObj.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default GetCountries;