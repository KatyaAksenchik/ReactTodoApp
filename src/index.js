import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


let data = [
    {
        id: 1,
        name: "Buy ticket",
        done: false
    },
    {
        id: 2,
        name: "Make soup",
        done: false
    }, {
        id: 3,
        name: "Do nothing",
        done: false
    }
];


let counter = 1;


class InputBar extends React.Component {
    constructor() {
        super();
        this.handelClick = this.handelClick.bind(this);
    }

    handelClick(e) {
        let taskName = document.getElementById("inputName").value;
        this.props.onAddNewTask(taskName);
    }

    render() {
        return (
            <div className="input-bar-area">
                <input id="inputName" type="text"/>
                <button onClick={this.handelClick}>Create</button>
            </div>
        )
    }
}

class TasksList extends React.Component {

    initListItem(tasks) {
        return tasks.map((item) =>
            <li key={item.id}>{item.name}</li>
        );
    }

    render() {
        return (
            <div className="task-list">
                <ul>
                    {this.initListItem(this.props.value)}
                </ul>
            </div>
        )
    }
}

class MaintainableTaskArea extends React.Component {
    constructor() {
        super();
        this.handleNewTask = this.handleNewTask.bind(this);

        this.state = {
            tasks: data
        }
    }

    handleNewTask() {
        this.setState({
            tasks: data.push({
                id: 4,
                name: "Do something",
                done: false
            })
        })
    }

    render() {
        return (
            <div className="table-area">
                <InputBar onAddNewTask={this.handleNewTask}/>
                <TasksList value={this.state.tasks}/>
            </div>
        )
    }
}


class App extends React.Component {
    render() {
        return (
            <div className="app-area">
                <h1 className="title">TODO app</h1>
                <MaintainableTaskArea />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
