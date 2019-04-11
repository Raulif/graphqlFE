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

    onChange(e) {
        this.setState({[e.target.id]: e.target.value})
    }


    // ::::::::: QUERIES :::::::::: //

    // Create one user from form input

    createUser() {}


    // Fetch one single user from DB

    getSingleUser() {}


    // Fetch all the users

    getUsers() {}


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
