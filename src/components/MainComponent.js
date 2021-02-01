import React, { Component } from 'react';
import Menu from './MenuComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';

import {Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';

//This function is out of component declaration.
//In order to connect this MainComponent to the store is to use connect(mapStateToProps, [Component name])
//mapStateToProps() take the state from the store (configureStore.js in this exercise), map it to this component
//Therefore, whatever we use this.state....., we must change to this.props.
//Because, state is now belong to the store, the store pass the state to this component by connect(), state -> props
//in this component.


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author,comment) => dispatch(addComment(dishId, rating, author,comment)),
    fetchDishes: () => { dispatch(fetchDishes())}
})

class Main extends Component {
    constructor(props) {
        super(props);
    }

    //This is a React built-in lifecycle method. It will be executed just after the component
    //get mounted into the view of the application.
    componentDidMount() {
        this.props.fetchDishes();
      }

    render() {
        const HomePage = () => {
            return(
                <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
            );
        }
        // The Route down below will pass in 3 parameters, Location, History and Match.
        // We can just pick what parameter we need for this function
        const DishWithId = ({match}) => {
            return(
                <DishDetail 
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    addComment = {this.props.addComment}
                />
            );
        }

        return (
            <div className="App">
                <Header/>

                {/* Before without routing */}
                {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
                {/* With routing */}
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes = {this.props.dishes}/>} />
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Route path="/aboutus" component={() => <About leaders={this.props.leaders}/>} />
                    <Redirect  to="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }
}
//Here is how we connect this component to redux, connect(mapStateToProps)(Main).
//But if we use router, then we have to use withRouter(connect(mapStateToProps)(Main))
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));