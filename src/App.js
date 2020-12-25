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

	rendersquare(i){
		return <Square 
		value= {this.props.square[i]}	
		onClick={()=>this.props.onClick(i)}
		/>;
	}
	render(){
		return(
		<div>
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
	constructor(props){
		super(props); 
		this.state={
			history:[
				{square: Array(9).fill(null),}
			],
			Isxturn: true
		};
	}

	handleClick(i){
		const history= this.state.history;
		const current= history[history.length-1];
		const square = current.square.slice();
		if(this.declarewinner(square) || square[i])
			return;
		square[i]=this.state.Isxturn?"X": "O";
		this.setState({
			history: history.concat([{
				square:square,
			}]),
			Isxturn: !this.state.Isxturn
		});
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
		if(square[a]&& square[a]===square[b] && square[a]===square[c])
			return square[a];
		}
		return null;
	}
	render(){
		const history= this.state.history;
		const current= history[history.length-1];
		const square= current.square.slice();
		let status;
		const winner= this.declarewinner(square);
		if(winner)
			status= "Winner is :"+ winner;
		else
			status= "player status: "+ (this.state.Isxturn?"X":"O");
		return(
		<div>
		<h1>Welcome to the Game </h1>
		<div >
		<p class ="status">{status}</p>
		<Board
		square ={square}
		onClick={i => this.handleClick(i)}
		/>
		</div>
		</div>
		);
	}
}

export default App;
