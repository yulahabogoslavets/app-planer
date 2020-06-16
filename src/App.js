import React from 'react';
import './App.css';
import List from "./list";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row, Button, Form} from "react-bootstrap";
import NewList from "./NewList";

export default class App extends React.Component{
  constructor(props) {
    super(props);

    let tempArr=[];
    if(localStorage.getItem('LocalData')!==null)
      tempArr=JSON.parse(localStorage.getItem('LocalData'));

    this.state={
          products: tempArr,
          element:{
            text: '',
            key: '',
            number: '',
            date: '',
            isChecked: false,
            isNotify: false
          },
          tempInterval: ''
    }
  }


  componentDidMount() {
    const handle = setInterval(this.checkDates, 2000);
    this.setState({
      tempInterval: handle
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.tempInterval)
  }

  checkDates=()=>{
    let tempVar = [];
    if (localStorage.getItem('LocalData') !== null){
      tempVar = JSON.parse(localStorage.getItem('LocalData'))
    } else {tempVar = []}

    const expArr = tempVar.filter((elem,index, arr)=>{
      let dateConvert = Date.parse(elem.date);
      let conDate = dateConvert < Date.now() && elem.isChecked === false;

     if (conDate === true && elem.isNotify === false) {
       this.notifySet(elem);
       tempVar[index].isNotify=true;
     }

      return conDate
    })

    localStorage.setItem('expArr', JSON.stringify(expArr));
    localStorage.setItem('LocalData', JSON.stringify(tempVar));

    this.setState(this.state)
  }

  addMemory=(newEinkaufList)=>{
    localStorage.setItem('LocalData', JSON.stringify(newEinkaufList));
    console.log(localStorage);
  }

  addElement=(event)=>{
    event.preventDefault();

    const newElement = this.state.element;
    if(newElement.text!=="" && newElement.number!==""
        && newElement.date!=="") {
      const newProducts = [...this.state.products, newElement];

      this.addMemory(newProducts);

      this.setState({
        products: newProducts,
        element: {
          text: '',
          key: '',
          number: '',
          date: '',
          isChecked: false,
          isNotify: false
        }
      })
    }
  }

  handleText=(event)=>{
    this.setState({
      element: {
        text: event.target.value,
        key: Date.now(),
        number: this.state.element.number,
        date: this.state.element.date,
        isChecked: this.state.element.isChecked,
        isNotify: this.state.element.isNotify
      }
    })
  }
  handleNumber=(event)=>{
    this.setState({
      element:{
        number: event.target.value,
        key: Date.now(),
        text: this.state.element.text,
        date: this.state.element.date,
        isChecked: this.state.element.isChecked,
        isNotify: this.state.element.isNotify
      }
    })
  }
  handleDate=(event)=>{
    this.setState({
      element:{
        date: event.target.value,
        key: Date.now(),
        text: this.state.element.text,
        number: this.state.element.number,
        isChecked: this.state.element.isChecked,
        isNotify: this.state.element.isNotify
      }
    })
  }

  deleteElement=(item)=>{
    let arr = this.state.products;
    let indexEl = arr.indexOf(item);
    if(indexEl > -1) {
      arr.splice(indexEl, 1);
    }

    this.addMemory(arr);

    this.setState({
      products: arr
    })
  }

  editText =(newText, id)=>{
   const arr = this.state.products;

    // eslint-disable-next-line array-callback-return
    arr.map(item => {
      if(item.key === id){
        item.text = newText
      }
    })

    this.addMemory(arr);

    this.setState({
      text:arr
    })
  }
  editNumber =(newNumber, id)=>{
    const arr = this.state.products;

    // eslint-disable-next-line array-callback-return
    arr.map(item=>{
      if(item.key === id){
        item.number = newNumber
      }
    })

    this.addMemory(arr);

    this.setState({
      text: arr
    })
  }
  editDate =(newDate, id)=>{
    const arr = this.state.products;

    // eslint-disable-next-line array-callback-return
    arr.map(item=>{
      if(item.key === id){
        item.date = newDate
      }
    })

    this.addMemory(arr);

    this.setState({
      text:arr
    })
  }

  toggleChange = (isChecked, id)=> {
    const arr = this.state.products;
    // eslint-disable-next-line array-callback-return
    arr.map(item=>{
      if(item.key===id){
        item.isChecked= !item.isChecked
      }
    })
    console.log('check', arr)
    this.addMemory(arr);

    this.setState({
      products: arr
    })
  }

/*Notification*/
  notifyMe = (elem)=>{
    let notification = new Notification("Expired product",{
      tag: "ache-mail",
      body: elem.text,
      renotify: true
    });
  }

  notifySet=(elem)=>{
    if(!("Notification" in window)){
      console.log("browser is not support")
    } else if (Notification.permission === "granted"){
      setTimeout(()=> {this.notifyMe(elem)}, 1000);
    } else if (Notification.permission !== 'denied'){
      Notification.requestPermission(function (permission){
        if (permission === "granted") {
          setTimeout(()=>{this.notifyMe(elem)}, 1000)
        }
      })
    }
  }


  render(){
    return(
        <Container fluid="md" className="bg-light">
          <Row className="justify-content-sm-center">
              <h1 className="ml-3">Einkaufsplanner</h1>
          </Row>

          <Form className="mb-3">
            <Form.Row className="align-items-center ">
              <Form.Group as={Col} md={3}>
                <Form.Label htmlFor="name">Name:</Form.Label>
                <Form.Control type="text"
                       id="name"
                       value={this.state.element.text}
                       onChange={this.handleText}
                />
              </Form.Group>

              <Form.Group as={Col} md={3}>
                <Form.Label htmlFor="number">Number:</Form.Label>
                <Form.Control type="number"
                       id="number"
                       value={this.state.element.number}
                       onChange={this.handleNumber}
                />
              </Form.Group>
              <Form.Group as={Col} md={3}>
                <Form.Label htmlFor="date">Date:</Form.Label>
                <Form.Control type="date"
                       id="date"
                       value={this.state.element.date}
                       onChange={this.handleDate}
                />
              </Form.Group>

                <Button  className="mt-3" as={Col} sm={3}
                        variant="outline-success"
                        onClick={this.addElement}>
                  Add
                </Button>
              </Form.Row>
          </Form>
          <List
              product = {this.state.products}
              deleteElement = {this.deleteElement}
              editText = {this.editText}
              editNumber = {this.editNumber}
              editDate = {this.editDate}
              toggleChange={this.toggleChange}
              notify =  {this.notifySet}
          />
          <NewList/>
        </Container>
    )
  }
}
