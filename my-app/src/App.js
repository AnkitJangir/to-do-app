import React from 'react';
import './App.css';
import localforage from 'localforage'
class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      list:[],
      value:""
    };
  }
  componentDidMount()
  {
    
  }
  inp(e)
  {
      this.setState({
        value:e.target.value
      })
      console.log(this.state.value)
  }
  addItem()
  {
    console.log("add item")
    this.newItem=this.state.value.trim();
    if(this.newItem.length !== 0)
    {
    this.setState({
      list:[...this.state.list,{imp:this.newItem,status:false,date:new Date().toString().slice(0,24)}],
      value:""
    })
    this.storage(this.newItem);
  }
  else
  {
    this.setState({
      value:""
    })
  }
  }
  storage(newItem)
  {
    localStorage.setItem('list',newItem)
  }

  /*moveTop(item)
  {
    let l=this.state.list;
    let i=l.indexOf(item);
    let length=this.state.list.length;
    if(i!==0)
    {
      for(let j of length)
      {
        l[j+1]=l[j];
        l[j]=l[i]; 
        this.setState({
        list:l
        })
      }
    }
  }*/
  moveUp(item)
  {
    console.log("UP")
    let l=this.state.list;
    let i=l.indexOf(item);
    if(i!==0)
    {
      let temp=l[i];
      l[i]=l[i-1];
      l[i-1]=temp;
      this.setState({
        list:l
      })
    }
  }
  moveDown(item)
  {
    console.log("Down")
    let l=this.state.list;
    let i=l.indexOf(item);
    if(i!==l.length-1)
    {
      let temp=l[i];
      l[i]=l[i+1];
      l[i+1]=temp;
      this.setState({
        list:l
      })
    }
  }
  remove(item)
  {
    let l=this.state.list;
    let updatedList=l.filter((lItem)=>lItem !==item);
    this.setState({
      list:updatedList
    })
  }
  list()
  {
    console.log("From List function");
    let items=[];
    items=this.state.list.map((item)=>
    <div className="row">
      <li  draggable onClick={()=>this.setStatus(item)} className={item.status ? "paper-btn btn-block col-6 btn-success " : "paper-btn btn-block col-6 " } >{item.imp} <span className='alt'>{item.date}</span></li>
      <button className={this.state.list.indexOf(item)===0 ? "paper-btn col-2 disabled btn-primary" : "paper-btn col-2 btn-primary"} onClick={()=>this.moveUp(item)}>UP</button>
      <button className={this.state.list.indexOf(item)===(this.state.list.length-1) ? "paper-btn disabled col-2 btn-secondary " : "paper-btn col-2 btn-secondary "} onClick={()=>this.moveDown(item)}>Down</button>
      <button className="paper-btn col-2 btn-danger" onClick={()=>this.remove(item)}>X</button>
    </div>)
    return items;
  }
  
  setStatus(item)
  {
    console.log("SSS")
    let l=this.state.list;
    let i=l.indexOf(item);
    l[i].status=!l[i].status;
    this.setState({
      list:l
    })
    console.log(this.state.status)
  }

  render()
  {
    return <div>
      <button type="submit" onClick={()=>this.addItem()} className="row flex-center" >Add</button>
      <input type="text" onChange={(e)=>this.inp(e)} className="row flex-center"placeholder="Item" value={this.state.value}></input>
      <h4 className="row flex-center">Completed Items:{this.state.list.filter((item)=>item.status===true).length}/{this.state.list.length}</h4>
      <progress value={this.state.list.filter((item)=> item.status===true).length*100/this.state.list.length} max="100" className="row flex-center"></progress>
      <ol>{this.list()}</ol>
    </div>
  }
}
function Parent()
{
  return <div>    
    <h1 className="row flex-center">To Do List</h1>
    <App></App>
  </div>
}
export {Parent};