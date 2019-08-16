import React from 'react'
import { Container } from 'react-bootstrap'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';
import { Link } from "react-router-dom";
import {connect} from 'react-redux'

import { CAT_IMAGE_URL } from '../Const/'

import {increasePage, setCurrentBreed,resetPage  } from '../redux/actions/'

class ViewCat extends React.Component {

    
    constructor(props){
        super(props);

        this.state = {            
            loading:true,
            cat:null
        }

        this.fetchCatInfo = this.fetchCatInfo.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.renderImage = this.renderImage.bind(this);
    }

    render() {

        if ( this.state.cat === null ) return (  <div className="singeCat"><Container><h6>Loading...</h6></Container></div>);

        return (
            <div className="singeCat">
            <Container>
                <Card.Header>
                    <Link className="btn btn-primary" to={`/?breed=${this.state.cat.breeds[0].id}`}>Back</Link>   
                </Card.Header>
                    {this.renderImage()}
                <Card.Body>
                    {this.renderBody()}
                </Card.Body>

            </Container>
            </div>
        );
    }

    componentDidMount(){
        this.fetchCatInfo();
        this.props.resetPage();
    }

    renderBody(){
        if ( this.state.cat === null ) return;

        return (<div><h4>
                {this.state.cat.breeds[0].name} </h4>
                <h5> Origin : {this.state.cat.breeds[0].origin} </h5>
                <h6> {this.state.cat.breeds[0].temperament}</h6></div>
            )
    }

    renderImage(){

        if ( this.state.cat === null ) return;

            return (<img className="card-img-top" alt={this.state.cat.id} src={this.state.cat.url} />
            )
    }



    fetchCatInfo(){

        
        let vm = this;
        
        this.setState({loading:true})




        axios({
           method: 'get',
           url: CAT_IMAGE_URL + this.props.match.params.catid
         })
           .then(function (response) {
               
               vm.setState({'cat':response.data})
           });
    }

  }

  //export default ViewCat;

  function mapStateToProps(state){
    return {
        currentPage:state.appState.currentPage
    }
  }

//export default Home;


export default connect(mapStateToProps,{increasePage,setCurrentBreed, resetPage})(ViewCat)