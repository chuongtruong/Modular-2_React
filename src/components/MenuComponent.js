import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish })
    }

    renderComments(c) {
        const comment = c.map((cmt) => {
            return (
                <div key={cmt.id}>
                    <h4>{cmt.comment}</h4>
                    <p>-- {cmt.author}, {cmt.date}</p>
                </div>
            );
        });
        return comment
    }
    
    renderDish(dish) {
        if (dish != null) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" object src={dish.image} alt={dish.name}></CardImg>
                            <CardBody>
                                <CardTitle>
                                    {dish.name}
                                </CardTitle>
                                <CardText>
                                    {dish.description}

                                </CardText>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="col-12 col-md-5 m-1">
                        <h3>Comments</h3>
                        {this.renderComments(dish.comments)}
                    </div>
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }

    render() {
        // create a const of html then add it to other place
        // to reuse this const, put {const name} to where you want to put.
        const menu = this.props.dishes.map((dish) => {
            return (
                //key help react to recognize each element
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" object src={dish.image} alt={dish.name}></CardImg>
                        <CardImgOverlay body className="ml-5">
                            <CardTitle>
                                {dish.name}
                            </CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>

            );
        });
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>

                {this.renderDish(this.state.selectedDish)}
            </div>
        );
    }
}

export default Menu