import React, { Component } from 'react';
import Menu from './MenuComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import {Switch, Route, Redirect} from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    render() {
        const HomePage = () => {
            return(
                <Home 
                dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                promotions={this.state.promotions.filter((promo) => promo.featured)[0]}
                leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
        // The Route down below will pass in 3 parameters, Location, History and Match.
        // We can just pick what parameter we need for this function
        const DishWithId = ({match}) => {
            return (
                //match.params.dishId,10 -> convert the ID to base 10 integer
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
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
                    <Route exact path="/menu" component={() => <Menu dishes = {this.state.dishes}/>} />
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Redirect  to="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default Main;
