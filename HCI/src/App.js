import React from 'react';

import '../src/app.css';
class App extends React.Component{
    
    list=["cat","dog","gorilla","rat","monkey","giraffe","lion"];

    state={
        display:"",
        timer:0,
        input:"",
        answers:[],
        score:0
    };

    timer=0;

    listElements=this.list.map((item)=>{
        return(
            <li key={item}>
                {item}
            </li>
        )
    });

    onInputChange=(e)=>{
        this.setState({input:e.target.value});
    }

    handleButtonSubmit=(e)=>{
        e.preventDefault();
        if(this.state.answers.includes(this.state.input))
            return;
        if(this.list.includes(this.state.input)){
            var tmplist=this.state.answers;
            tmplist.push(this.state.input);
            this.setState({
                score:this.state.score+1,
                answers:tmplist,
                input:""
            });
        }
    }

    handleStartButton=(e)=>{
        e.preventDefault();
        this.setState({display:"timer",score:0,timer:10});
        this.startTimer();
    }

    startTimer=()=>{
        this.timer=setInterval(this.updateStateTimer,1000);
    }

    updateStateTimer=()=>{
        if(this.state.timer-1===0 && this.state.display==="timer"){
            clearInterval(this.timer);
            this.setState({display:"form",timer:30});
            this.startTimer();
            return;
        }
        if(this.state.timer-1===0){
            clearInterval(this.timer);
            this.setState({display:"done"});
            return;
        }
        this.setState({timer:this.state.timer-1});
    }

    returnDisplay=()=>{
        const answerList=this.state.answers.map((item)=>{
            return(
                <li key={item}>
                    {item}
                </li>
            )
        });

        if(this.state.display==="")
            return(
            <button className="ui button primary center" onClick={this.handleStartButton} >
                Start
            </button>
        );
        if(this.state.display==="timer")
            return(
                <div className="timer">
                    <h3>
                       Time remaining: {this.state.timer} 
                    </h3>
                    <h3>
                        Remember the animals in the list below
                    </h3>
                    <ul>
                        {this.listElements}
                    </ul>
                </div>
            );

        if(this.state.display==="form")
            return (
                <form className="ui form">
                    <h3 className="center">
                       Time remaining: {this.state.timer} 
                    </h3>
                    <h3 className="center">
                        Current score : {this.state.score}
                    </h3>
                    <div className="field">
                        <label className="center" htmlFor="Animal-name">Animal Name</label>
                        <input 
                            className="center" 
                            type="text" 
                            name="Animal-name" 
                            placeholder="Enter Name" 
                            onChange={this.onInputChange} 
                            value={this.state.input}
                        />
                    </div>
                    <button className="ui button primary center" onClick={this.handleButtonSubmit}>Submit</button>
                    <h3>
                       Already answered: 
                    </h3>
                    <ul>
                        {answerList}
                    </ul>
                </form>
            );
        return(
            <>
                <h3>
                    Your final score was: {this.state.score}
                </h3>
                <button className="ui button primary center" onClick={this.handleStartButton} >
                    Restart
                </button>
            </>
        )
    }

    render(){
        
        return(
            <div className="app container">
                {this.returnDisplay()}
            </div>
        );
    }
}
export default App;