import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            tasks: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post('/tasks', {
                name: this.state.name
            })
            .then(response => {
                this.setState({
                    tasks: [response.data, ...this.state.tasks],
                    name: '',
                })
            });
    }

    renderTasks() {
        return this.state.tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <div>
                        {task.name}
                        <Link
                            to={`/${task.id}/edit`}
                            className="btn btn-sm btn-success float-right"
                        >
                            Update
                        </Link>
                        <button
                            onClick={() => this.handleDelete(task.id)}
                            className="btn btn-sm btn-warning float-right">Delete
                        </button>
                    </div>
                </div>
            </div>
        ))
    }

    getTasks() {
        axios.get('/tasks').then(response =>
            this.setState({
                tasks: [...response.data.tasks]
            })
        );
    }

    componentWillMount() {
        this.getTasks();
    }

    handleDelete(id) {
        const isNotId = task => task.id !== id;
        const updatedTasks = this.state.tasks.filter(isNotId);
        this.setState({ tasks: updatedTasks });

        axios.delete(`/tasks/${id}`);
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Creat Task</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                            rows="10"
                                            className="form-control"
                                            placeholder="New task"
                                            maxLength="255"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Create Task
                                    </button>
                                </form>
                                <hr/>
                                {this.renderTasks()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
