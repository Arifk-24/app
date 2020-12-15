import React from 'react';
import './App.css';

class Square extends React.Component{
	render(){
  return (
	<button class ="button" 
	onClick={()=>this.props.onClick()}
	>{this.props.value} </button>
  );
	}
}
class Board extends React.Component{
	constructor(props){
		super(props); 
		this.state={
			square : Array(9).fill(null),
			Isxturn: true
		};
	}
	declarewinner(square){
		const list=[
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
		];
		for(let i=0;i<list.length;i++)
		{
		const [a,b,c]=list[i];
		if(square[a]===square[b] && square[b]===square[c] && square[c]===square[a])
			return square[b];
		}
		return null;
	}
	handleClick(i){
		const square = this.state.square.slice();
		if(this.declarewinner(square) || square[i])
			return;
		square[i]=this.state.Isxturn?"X": "O";
		this.setState({
			square: square,
			Isxturn: !this.state.Isxturn
		});
	}
	/*
	declarewinner(square){
		const list=[
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
		];
		for(let i=0;i<list.length;i++)
		{
		const [a,b,c]=list[i];
		if(square[a]===square[b] && square[b]===square[c] && square[c]===square[a])
			return square[b];
		}
		return null;
	}
	*/
	rendersquare(i){
		return <Square 
		value= {this.state.square[i]}	
		onClick={()=>this.handleClick(i)}
		/>;
	}
	render(){
		let status;
		let winner= this.declarewinner(this.state.square);
		if(winner)
			status= "Winner is :"+ winner;
		else
			status= "player status: "+ (this.state.Isxturn?"X":"O");
		return(
		<div>
		<p class = " status">{status}</p>
		<table class = "board">		
		<tr>	    
		<td>{this.rendersquare(0)}</td>
		<td>{this.rendersquare(1)}</td>
		<td>{this.rendersquare(2)}</td>
		</tr>
		<tr>
		<td>{this.rendersquare(3)}</td>
		<td>{this.rendersquare(4)}</td>
		<td>{this.rendersquare(5)}</td>
		</tr>
		<tr>
		<td>{this.rendersquare(6)}</td>
		<td>{this.rendersquare(7)}</td>
		<td>{this.rendersquare(8)}</td>
		</tr>
		</table>
		</div>
		);
	}
}
class App extends React.Component{
	render(){
		return(
		<div>
		<h1>Welcome to the Game </h1>
		<div >
		<Board/>
		</div>
		</div>
		);
	}
}

export default App;
