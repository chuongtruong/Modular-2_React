import React, { Component } from 'react';
import {
  Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label
} from 'reactstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false

    }
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  //Defining a function, see the <NavbarToggler onClick={this.toggleNav} /> below ?, but in order to use this function, we ALSO have
  //to bind it to the component, in the contructor ^^/ A little hard to understand.
  //see videos https://www.coursera.org/learn/front-end-react/lecture/meLZh/exercise-video-react-router
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleLogin(event) {
    this.toggleModal();
    alert("Username: " + this.username.value + " Password: " + this.password.value
      + " Remember: " + this.remember.checked);
    event.preventDefault();

  }

  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img src="assets/images/logo.png" height="30" width="41" />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home"><span className="fa fa-home fa-lg">Home</span></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus"><span className="fa fa-info fa-lg">About Us</span></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu"><span className="fa fa-list fa-lg">Menu</span></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus"><span className="fa fa-address-card fa-lg">Contact Us</span></NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg"> Login</span>
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                {/* innerRef={(input) => this.username = input  is use to retrieve information from this field*/}
                <Input type="text" id="username" name="username" innerRef={(input) => this.username = input} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" innerRef={(input) => this.password = input} />
              </FormGroup>

              <FormGroup check>
                <Input type="checkbox" name="remember" innerRef={(input) => this.remember = input} />Remember Me
              </FormGroup>

              <Button type="submit" value="submit" className="bg-primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;