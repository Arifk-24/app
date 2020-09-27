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
		<div class ="row">
		{this.rendersquare(0)}
		{this.rendersquare(1)}
		{this.rendersquare(2)}
		</div>
		<div class= "row">
		{this.rendersquare(3)}
		{this.rendersquare(4)}
		{this.rendersquare(5)}
		</div>
		<div class= "row">
		{this.rendersquare(6)}
		{this.rendersquare(7)}
		{this.rendersquare(8)}
		</div>
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
