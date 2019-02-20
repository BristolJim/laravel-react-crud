import React, {Component} from 'react';

export default class TaskEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            task: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`/tasks/${this.props.match.params.id}`, {
                name: this.state.name,
            })
            .then(response => {
                this.props.history.push('/')
            });
    }

    getTask() {
        axios
            .get(`/tasks/${this.props.match.params.id}/edit`)
            .then(response =>
                this.setState({
                    name: response.data.task.name,
                    task: response.data.task,
                })
            );
    }

    componentWillMount() {
        this.getTask();
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Task</div>
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
                                        Update Task
                                    </button>
                                </form>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
