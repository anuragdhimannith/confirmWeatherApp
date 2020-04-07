import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'
class App extends React.Component {
    // This is the first ever function which run when we render this component...
    state = { lat: null, errMessage: '' };
    
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude }),
            (err) => this.setState({ errMessage: err.message })
        );
    };

    // If there is any conditional rendering in the component then make a helper method so that we can keep our jsx clean and dry....
    renderContent() {
        if(this.state.errMessage && !this.state.lat) {
            return <div> Error: {this.state.errMessage}</div>
        } 
        if(!this.state.errMessage && this.state.lat) {
            return <SeasonDisplay lat = {this.state.lat} />
        } 
        return <Spinner message = 'Please accept the location request'/>
    }

    render() {
        return <div>
           {this.renderContent()}
       </div>
    };
};

ReactDOM.render(<App />, document.getElementById('root'));