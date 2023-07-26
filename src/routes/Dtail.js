import { useParams } from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import styled from 'styled-components'


import { Nav } from 'react-bootstrap';

import {Context1} from './../App.js';

function Detail(props){

    let {재고} =  useContext(Context1) //보관함을 해체 해줌

    let {id} = useParams();
    let 찾은상품 = props.shoes.find( x => x.id == id );
    
    let [count, setCount] = useState(0)
    //let [alert, setAlert] = useState(true)
    let [num, setNum] = useState('')
    //useEffect 는 html렌디링 후 동작
/*     useEffect(()=>{
        let a = setTimeout(()=>{ setAlert(false) }, 2000)
        
        //useEffect 동작 전에 실행return ()=>{}
        return ()=>{
            clearTimeout(a);// <--타이머 제가하는 함수
             //기존 데이터요청은 제거
        }
    }) */

    /* 
    useEffect( ()=> {} )//1. 재렌더링마다 코드실행하고 싶으면
    useEffect( ()=> {},[] )//2. mount 1회 코드실행고 싶으면
    useEffect( ()=> {
        return ()=>{
            //3.unmount시 1회 코드실행하고 싶으면
        }
    },[] )
    4. 
    */

    useEffect(()=>{
      if (isNaN(num) == true){
        alert('그러지마세요')
      }
    }, [num]);

    
    let [tab, setTab] = useState(0);

    return(
        
        <div className="container">
{/*             {
                alert ? 
                <div className='alert alert-wrning'>
                    2초 이내 구매시 할인
                </div>
                :
                null
            } */}

            {count}
            <button onClick={()=>{ setCount(count+1) }}>버튼</button>

            <div className="row">
                <div className="col-md-6">
                    <img src='https://codingapple1.github.io/shop/shoes1.jpg' width="100%" />
                    
                        <input onChange={(e)=>{ setNum(e.target.value) }} />
                        <h4 className="pt-5">{찾은상품.title}</h4>
                        <p>{찾은상품.content}</p>
                        <p>{찾은상품.price} 원</p>
                        <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
        
        <TabContent shoes={props.shoes} tab={tab}/>
            
        
        </div> 
    );
  }

/* 
  function TabContent(props){

    if( props.tab == 0 ){
        return <div>내용0</div>
    }else if( props.tab == 1 ){
        return <div>내용1</div>
    }else if( props.tab == 2 ){
        return <div>내용3</div>
    }
  } */
/* 
  function TabContent({tab}){
    return [<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][tab]
  } */

  function TabContent({tab, shoes}){
    let [fade, setFade] = useState('')
    let {재고} =  useContext(Context1)

    useEffect(()=>{
        //setFade('end')
        setTimeout(()=>{ setFade('end') }, 100)
        return ()=>{
            setFade('')
        } 
    }, [tab])

    return (
        <div className={'start ' + fade}>
        { [<div>{shoes[0].title}</div>, <div>{재고}</div>, <div>내용2</div>][tab] }
        </div>
    )
  }


  export default Detail;