// register screen and logic for register save to local database

import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            username: '',
            password: '',
            password2: '',
        };
    }

    register_user = () => {
        var that = this;
        const { fullname } = this.state;
        const { username } = this.state;
        const { password } = this.state;
        const { password2 } = this.state;
        if (fullname) {
        if (username) {
            if (password) {
                if (password2) {
                    if (password == password2) {
                        db.transaction(function (tx) {
                            tx.executeSql(
                                'INSERT INTO table_user (user_fullname, user_username, user_password) VALUES (?,?,?)',
                                [fullname, username, password],
                                (tx, results) => {
                                    console.log('Results', results.rowsAffected);
                                    if (results.rowsAffected > 0) {
                                        Alert.alert(
                                            'Success',
                                            'You are Registered Successfully',
                                            [
                                                {
                                                    text: 'Ok',
                                                    onPress: () => Actions.pop(),
                                                },
                                            ],
                                            { cancelable: false }
                                        );
                                    } else {
                                        alert('Registration Failed');
                                    }
                                }
                            );
                        });
                    } else {
                        alert('Password does not match');
                    }
                } else {
                    alert('Please fill Confirm Password');
                }
            } else {
                alert('Please fill Password');
            }
        } else {
            alert('Please fill username');
     }
        } else {
            alert('Please fill fullname');
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(fullname) => this.setState({ fullname })}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Full Name"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onSubmitEditing={() => this.username.focus()}
                />
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(email) => this.setState({ username })}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                />
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(password) => this.setState({ password })}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    ref={(input) => (this.password = input)}
                />
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(password2) => this.setState({ password2 })}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    ref={(input) => (this.password = input)}
                />
                <TouchableOpacity style={styles.button} onPress={this.register_user}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Text style={styles.signupButton}> Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#455a64',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10,
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
});