import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const settings = () => {
    const [username, setUsername] = useState<string>('');
    const [randomRepo, setRandomRepo] = useState('');

    const fetchRepo = () => {
        console.log(username);
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(response  => response.json())
        .then(data => setRandomRepo(data[Math.floor(Math.random() * data.length)].name))
        .catch(error => console.log(error))
    }

  return (
    <View style={styles.container}>
      <Text>settings</Text>
      <TextInput style={styles.input} placeholder='Username' value={username} onChangeText={setUsername}  />
      <Button title='Fetch Repos' onPress={fetchRepo}></Button>
      <Text>Random Repo: {randomRepo}</Text>
    </View>
  )
}

export default settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        padding: 10,
        borderColor: "gray",
        borderWidth: 1,
        width: "80%",
        marginTop: 20,
        borderRadius: 8,
        height: 50,
        backgroundColor: "white"
    },
    button: {
        padding: 5
    }
})