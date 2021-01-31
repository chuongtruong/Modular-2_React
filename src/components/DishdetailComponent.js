import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

export class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.message);       
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Comment </span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <div className="container">
                                {/* Rating */}
                                <Row className="form-group">
                                    <Label htmlFor="rating">
                                        Rating
                                </Label>
                                </Row>
                                <Row className="form-group">
                                    <Control.select
                                        model=".rating"
                                        id="rating"
                                        name="Rating"
                                        className="form-control"
                                        validators={{
                                            required, isNumber
                                        }}>

                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>

                                    </Control.select>

                                    <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            isNumber: ' Must be a number '
                                        }}
                                    />
                                </Row>

                                {/* Name */}
                                <Row className="form-group">
                                    <Label htmlFor="author">
                                        Your name
                                </Label>
                                </Row>
                                <Row className="form-group">
                                    <Control.text
                                        model=".author"
                                        id="author"
                                        name="author"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />

                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less'
                                        }}
                                    />
                                </Row>

                                {/* Comments */}
                                <Row className="form-group">
                                    <Label htmlFor="comment">
                                        Comments
                                </Label>
                                </Row>
                                <Row className="form-group">
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="4"
                                        className="form-control" />
                                </Row>
                                <Row className="form-group">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Row>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}


function RenderDish({ dish }) {
    return (
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
    )
}

function RenderComments({ comments, addComment, dishId }) {
    if (comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key="{comment.id}">
                                <p>{comment.comment}</p>
                                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        )
                    })}
                </ul>
                <Comment dishId={dishId} addComment={addComment}></Comment>
            </div>
        );
    else
        return (
            <div></div>
        );
}

const DishDetail = (props) => {

    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        dishId = {props.dish.id}/>
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

export default DishDetail;