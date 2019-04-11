import React, { Component } from 'react';
import styles from './styles';

class App extends Component {
    state = {
        users: [],
        email: '',
        password: '',
        name: '',
        singleName: '',
        singleUser: undefined
    };


    getUsers() {
        const requestBody = {
            query: `
                query {
                    users {
                        _id
                        name
                        email                    
                    }
                }
            `
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(({data}) => {
                console.log({data});
                if(data) {
                    this.setState({users: data.users});
                }
            })
            .catch(err => console.log('getUsers', err));
    }

    getSingleUser() {
        const requestBody = {
            query: `
                query {
                    user(name: "${this.state.singleName}") {
                        name
                        email
                        _id
                    }
                }
            `
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(({data}) => {
                console.log({data});
                if(data) {
                    this.setState({singleUser: data.user});
                }
            })
            .catch(err => console.log('getUsers', err));
    }

    createUser() {
        if (this.state.name === '' || !this.state.name) {
            return
        }
        const requestBody = {
            query: `
                mutation {
                    createUser(userInput: {
                        email: "${this.state.email}"
                        password: "${this.state.password}"
                        name: "${this.state.name}"
                    }) {
                        _id
                        email
                        name
                    }
                }
            `
        };

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(({data}) => {
            if (data) {
                const users = this.state.users;
                users.push(data.createUser);
                this.setState(users)
            }
        })
        .catch(err => console.log('createUser', err));
    }


    onChange(e) {
        this.setState({[e.target.id]: e.target.value})
    }

    render() {
        return (
            <div style={styles.container} className="App">

                <button type={'button'} onClick={this.createUser.bind(this)} style={styles.button}>Create User</button>
                <div style={styles.form}>
                    <div style={styles.formItem} className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" onChange={this.onChange.bind(this)}/>
                    </div>
                    <div style={styles.formItem} className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" onChange={this.onChange.bind(this)} />
                    </div>
                    <div style={styles.formItem} className="form-control">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" onChange={this.onChange.bind(this)} />
                    </div>
                </div>
                <button type={'button'} onClick={this.getSingleUser.bind(this)} style={styles.button2}>Get User</button>
                <div style={styles.form}>
                    <div style={styles.formItem} className="form-control">
                        <label htmlFor="singleName">Search User</label>
                        <input type="text" id="singleName" onChange={this.onChange.bind(this)} />
                    </div>
                </div>
                {this.state.singleUser && (
                    <div style={styles.singleItem}>
                        {this.state.singleUser._id && (<div style={styles.itemContent}>
                            <p>Id:</p>
                            <p>{this.state.singleUser._id}</p>
                        </div>)}
                        <div style={{...styles.itemContent, ...styles.border}}>
                            <p>Name:</p>
                            <p>{this.state.singleUser.name}</p>
                        </div>
                        <div style={{...styles.itemContent, ...styles.border}}>
                            <p>Email:</p>
                            <p>{this.state.singleUser.email}</p>
                        </div>
                    </div>
                )}

                <button type={'button'} onClick={this.getUsers.bind(this)} style={styles.button2}>Get Users</button>
                <ul style={styles.list}>
                    {this.state.users.length > 0 && (
                        <h1 style={styles.title}>Users</h1>
                    )}
                    {this.state.users.map((user, index) => (
                        <li key={index} style={styles.listItem}>
                            {user._id && (<div style={styles.itemContent}>
                                <p>Id:</p>
                                <p>{user._id}</p>
                            </div>)}
                            <div style={{...styles.itemContent, ...styles.border}}>
                                <p>Name:</p>
                                <p>{user.name}</p>
                            </div>
                            <div style={{...styles.itemContent, ...styles.border}}>
                                <p>Email:</p>
                                <p>{user.email}</p>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        );
    }
}

export default App;
