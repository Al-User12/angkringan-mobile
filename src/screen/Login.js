// login screen and logic for login save to local database if user does not exist redirect to register screen
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    login_user = () => {
        var that = this;
        const { username } = this.state;
        const { password } = this.state;
        if (username) {
            if (password) {
                db.transaction(function (tx) {
                    tx.executeSql(
                        'SELECT * FROM table_user where user_username = ? AND user_password = ?',
                        [username, password],
                        (tx, results) => {
                            var len = results.rows.length;
                            if (len > 0) {
                                Alert.alert(
                                    'Success',
                                    'You are Login Successfully',
                                    [
                                        {
                                            text: 'Ok',
                                            onPress: () => Actions.home(),
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            } else {
                                alert('Invalid Username or Password');
                            }
                        }
                    );
                });
            } else {
                alert('Please fill Password');
            }
        } else {
            alert('Please fill Username');
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(username) => this.setState({ username })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.btn} onPress={this.login_user}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={() => Actions.register()}>
                        <Text style={styles.signupButton}> Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000',
        marginVertical: 10,
    },
    btn: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
    },
    btnText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
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
        color: '#12799f',
        fontSize: 16,
    },
    signupButton: {
        color: '#12799f',
        fontSize: 16,
        fontWeight: '500',
    },
});