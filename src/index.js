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


class InputBar extends React.Component {
    constructor() {
        super();
        this.handelClick = this.handelClick.bind(this);
        this.handelChange = this.handelChange.bind(this);

        this.state = {
            taskName: ""
        }

    }

    handelChange(e) {
        this.setState({
            taskName: e.target.value
        })
    }

    handelClick(e) {
        let el = document.getElementById("inputName");
        el.value = "";

        this.props.onAddNewTask(e.target.value);
    }

    render() {
        return (
            <div className="input-bar-area">
                <input onChange={this.handelChange} id="inputName" type="text"/>
                <button onClick={this.handelClick} value={this.state.taskName}>Create</button>
            </div>
        )
    }
}

class TaskListItem extends React.Component {

    constructor(props) {
        super();
        this.handelBtnOnClick = this.handelBtnOnClick.bind(this);
    }


    handelBtnOnClick(e) {
        this.props.onAddDeleteTask(this.props.id);
    }

// <input type="checkbox"/>
    
    render() {
        return (
            <li className="listItem" key={this.props.id}>
                <span>
                    {this.props.name}
                </span>
                <span className="listBehavior">
                    <button onClick={this.handelBtnOnClick}>&#128473;</button>
                </span>
            </li>
        )
    }
}


class TasksList extends React.Component {

    constructor() {
        super();
        this.handelItemDelete = this.handelItemDelete.bind(this);
    }

    handelItemDelete(id) {
        this.props.onDeleteTaskArray(id);
    }

    initListItem(tasks) {
        return tasks.map((item) =>
            <TaskListItem onAddDeleteTask={this.handelItemDelete} name={item.name} id={item.id}/>
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
        this.handelDeletetask = this.handelDeletetask.bind(this);

        this.state = {
            tasks: data
        }
    }

    handleNewTask(name) {
        let updTasks = this.state.tasks.slice(),
            id = updTasks.length + 1;

        updTasks.push({
            id: id,
            name: name,
            done: false
        });

        this.setState({
            tasks: updTasks
        })
    }

    handelDeletetask(id) {
        let tasksArray = this.state.tasks.slice();
        let index = 0;

        tasksArray.forEach((item, i) => {
            if (item.id === id) {
                index = i;
            }
        });

        tasksArray.splice(index, 1);

        this.setState({
            tasks: tasksArray
        })
    }

    render() {
        return (
            <div className="table-area">
                <InputBar onAddNewTask={this.handleNewTask}/>
                <TasksList onDeleteTaskArray={this.handelDeletetask} value={this.state.tasks}/>
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
