import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Stack = createStackNavigator();

function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
    </View>
  );
}

function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
    </View>
  );
}

function LandingPage() {

  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Register');
  }

  const handleLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to Cashier App</Text>
      <Text style={styles.subtitle}>The easiest way to manage your sales</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
