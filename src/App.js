//import logo from './logo.svg';
import { createContext, useState } from 'react';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
// import bg from './img/bg.jpg'
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Dtail.js'
import axios from 'axios';

export let Context1 = createContext();


function App() {

  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10,11,12]);

  
  let navigate = useNavigate();//페이지이동 도와주는 함수

  return (
    <div className="App">
      
      

     <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link onClick={ ()=>{ navigate('-1') }}>Home</Nav.Link> */}
            <Nav.Link onClick={ ()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={ ()=>{ navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={ ()=>{ navigate('/about') }}>About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <Routes>
        
        <Route path='/' element={
          <>
         <div className='main-bg'></div>

          <div className='container'>
            <div className='row'>
              {
                shoes.map((a,i)=>{
                  return(
                    <Card shoes={shoes[i]} i={i} key={i}></Card>
                  )
                })
              }
              
            </div>
          </div>
          <button onClick={ ()=>{
            axios.get('https://codingapple1.github.io/shop/data3.json')
            .then((result)=>{
              //console.log(result.data);
              let copy = [...shoes, ...result.data];
              setShoes(copy);

            })
            .catch(()=>{

            });

            

          } }>더보기</button>
          </>
        } />
        <Route path='/detail/:id' element={ 
          <Context1.Provider value={{재고}}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />


        <Route path='/detail' element={<Detail/>} />
        <Route path='*' element={<div>없는페이지에요</div>} />

        <Route path='/about' element={<About/>}>
          <Route path='member' element={ <div>멤버임</div> } />
          <Route path='location' element={ <div>위치정보</div> } />
        </Route>        
      </Routes>


    </div>
  );
}

function About(){

  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );

}



function Card(props){
  return(
    <div className='col-md-4'>
      
      <a href ={ '/detail/'+props.i }>

      <img src={'https://codingapple1.github.io/shop/shoes'+(props.i+1)+ '.jpg'} width="80%"></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
      </a>
    </div>
  );
}

export default App;


