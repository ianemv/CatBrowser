import React from 'react';
import {connect} from 'react-redux'

import { Container, Row, Col, Button } from 'react-bootstrap'

import axios from 'axios';
import _ from 'lodash';

import { BREEDS_URL, SEARCH_URL } from '../Const/index'
import CatList from '../Components/catList'

import '../css/basic.css'

import {increasePage, setCurrentBreed,resetPage  } from '../redux/actions/'

class Home extends React.Component {

    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fetchCats = this.fetchCats.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.renderLoadButton = this.renderLoadButton.bind(this);
        this.filterResult = this.filterResult.bind(this);
        
        this.currentBreed = React.createRef();
        this.state = {
            currentBreed:'',
            cats:[],
            currentPage:1,
            breeds:[],
            loading:false,
            showButton:true
        }
    }


    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Are we adding new items to the list?
        // Capture the scroll position so we can adjust scroll later.
        if (prevState.currentBreed !== this.state.currentBreed) {
          this.currentBreed = this.state.currentBreed;
          return this.currentBreed;
        }
        return null;
      }
    
      componentDidUpdate(prevProps, prevState, snapshot) {
        
        if (this.state.currentBreed !== prevState.currentBreed && this.state.currentBreed !=='' ) {
            //this.setState({currentPage: 1,cats:[],loading:false,showButton:true})
            this.setState((state, props) => ({
                currentPage: 1,
                cats: [],
                loading: false,
                showButton:true
              }));
              this.props.resetPage();

            this.fetchCats();
        }
        
        if (this.state.currentBreed !== prevState.currentBreed && this.state.currentBreed===''){
            this.setState({currentPage: 1,cats:[]})
            this.props.resetPage();
        }
      }

    componentDidMount(){
        //fetch the breeds on mounted
        this.fetchBreeds();
        if (this.props.location.search !==''){
            let breedId = this.props.location.search.substr(this.props.location.search.indexOf("=") + 1);
            this.setState((state) => ({
                currentBreed: breedId
            }));
            this.fetchCats();
        }
    }

    fetchBreeds(){
        let vm = this;
         axios({
            method: 'get',
            url: BREEDS_URL,
          })
            .then(function (response) {
              // console.log(response);
                vm.setState({'breeds':response.data})
            });
    }

    filterResult(response){
        let currentCats = this.state.cats;

        let results = _.differenceBy(response, this.state.cats, 'id');
        if (results.length > 0){           
           return currentCats.concat(results);
        }else{            
            this.setState({showButton:false})
            return currentCats;
        }
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        
    
        this.setState((state) => ({
            currentBreed: value
        }));

        this.props.setCurrentBreed(value);

        //this.fetchCats();
      }

    fetchCats(){
        let catBreed = this.state.currentBreed;
        let vm = this;
        
        this.setState({loading:true})

        let params = {
            breed_id:catBreed,
            page:this.props.currentPage,
            limit:10,
            order:'ASC'
        };



        axios({
           method: 'get',
           url: SEARCH_URL,
           params: params
         })
           .then(function (response) {
      
               vm.props.increasePage();

               // if current page is still in page one use the response as the results else filter difference and add to existing

               let results = vm.state.currentPage !== 1 ? vm.filterResult(response.data) : response.data;
               //let results = response.data;
               //vm.filterResult(response.data);
               vm.setState({'cats':results, currentPage: parseInt(vm.state.currentPage) + 1,loading:false})
           });
    }

    renderOptions(){
        if (this.state.breeds.length === 0 ) return;

       return this.state.breeds.map((value, index) => {
            return <option key={value.id} value={value.id}>{value.name}</option>
          })
    }

    renderLoadButton() {
        
        if (!this.state.showButton || this.state.cats.length===0) return;

        return (<Col>
            <Button disabled={this.state.loading} variant="success" onClick={this.fetchCats}>  { this.state.loading ? 'Loading cats...' : 'Load more'} </Button>
        </Col>);
    }
    render(){
        return(
            <div className="home">
                
                <Container>
                    <h1>Cat Browser</h1>
                    
                    <Row style={{padding: '10px 0px'}}>
                    <Col xs={6} md={3}>
                        <div  style={{padding: '10px 0px'}}>
                    <label className="form-label" htmlFor="breed">Breed</label>
                    <select disabled={this.state.loading}  className="form-control" name="currentBreed" value={this.state.currentBreed} onChange={this.handleInputChange}>
                        <option value="">Select breed</option>
                        {this.renderOptions()}
                    </select>
                        </div>
                    </Col>
                    </Row>
                    <Row>
                            <CatList cats={this.state.cats}/>
                    </Row>
                    <Row>
                        {this.renderLoadButton()}
                    
                    </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentPage:state.appState.currentPage
    }
  }

//export default Home;


export default connect(mapStateToProps,{increasePage,setCurrentBreed, resetPage})(Home)