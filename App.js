import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  ImageBackground
} from "react-native";

const backgroundImage = require("/src/bgg.jpg");

export default function App() {
  const [id, setID] = useState(2);
  const [getName, setGetName] = useState("");
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [salary, setSalary] = useState("");

  const [showMethod, setShowMethod] = useState(null);

  const fetchUser = () => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then((response) => response.json())
      .then((json) =>
        setGetName(json.data.first_name + " " + json.data.last_name)
      );
  };

  const addUser = () => {
    fetch("https://reqres.in/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        job: job,
        salary: salary
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        ToastAndroid.show(
          "Created object at id: " + json.id,
          ToastAndroid.SHORT
        );
      });
  };

  const updateUser = () => {
    fetch("https://reqres.in/api/users/" + id, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        job: job,
        salary: salary
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        ToastAndroid.show("Updated object", ToastAndroid.SHORT);
      });
  };

  const deleteUser = () => {
    fetch("https://reqres.in/api/users/" + id, {
      method: "DELETE"
    }).then((response) => {
      console.log(response);
      ToastAndroid.show("Deleted object", ToastAndroid.SHORT);
    });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        {showMethod === null && <Text style={styles.header}>API DEMO</Text>}
        {showMethod === "GET" && (
          <View style={styles.methodContainer}>
            <Text style={styles.header}>GET!</Text>
            <TextInput
              placeholder="ID"
              style={styles.input}
              value={id.toString()}
              onChangeText={(text) => setID(Number(text))}
              keyboardType="numeric"
            />
            <Button
              title="Fetch"
              style={styles.button}
              onPress={fetchUser}
              color="#A4DE02"
            />
            <Text>Name: {getName}</Text>
          </View>
        )}
        {showMethod === "POST" && (
          <View style={styles.methodContainer}>
            <Text style={styles.header}>POST!</Text>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="red" // Updated placeholder text color to red
            />
            <TextInput
              placeholder="Job"
              style={styles.input}
              value={job}
              onChangeText={setJob}
              placeholderTextColor="red" // Updated placeholder text color to red
            />
            <TextInput
              placeholder="Salary"
              style={styles.input}
              value={salary}
              onChangeText={setSalary}
              placeholderTextColor="red" // Updated placeholder text color to red
            />
            <Button
              title="Post"
              style={styles.button}
              onPress={addUser}
              color="#A4DE02"
            />
          </View>
        )}

        {showMethod === "PUT" && (
          <View style={styles.methodContainer}>
            <Text style={styles.header}>PUT!</Text>
            <TextInput
              placeholder="Id"
              style={styles.input}
              value={id.toString()}
              onChangeText={(text) => setID(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="red" // Updated placeholder text color to red
            />
            <TextInput
              placeholder="Job"
              style={styles.input}
              value={job}
              onChangeText={setJob}
              placeholderTextColor="red" // Updated placeholder text color to red
            />
            <TextInput
              placeholder="Salary"
              style={styles.input}
              value={salary}
              onChangeText={setSalary}
              placeholderTextColor="red" // Updated placeholder text color to red
            />
            <Button
              title="Post"
              style={styles.button}
              onPress={updateUser}
              color="#A4DE02"
            />
          </View>
        )}
        {showMethod === "DELETE" && (
          <View style={styles.methodContainer}>
            <Text style={styles.header}>DELETE!</Text>
            <TextInput
              placeholder="Id"
              style={styles.input}
              value={id.toString()}
              onChangeText={(text) => setID(Number(text))}
              keyboardType="numeric"
            />
            <Button
              title="Post"
              style={styles.button}
              onPress={deleteUser}
              color="#A4DE02"
            />
          </View>
        )}
        <View style={styles.optionsButton}>
          <Button
            title="GET"
            style={styles.button}
            onPress={() => setShowMethod("GET")}
            color="#A4DE02"
          />

          <Button
            title="POST"
            style={styles.button}
            onPress={() => setShowMethod("POST")}
            color="#A4DE02"
          />

          <Button
            title="PUT"
            style={styles.button}
            onPress={() => setShowMethod("PUT")}
            color="#A4DE02"
          />

          <Button
            title="DELETE"
            style={styles.button}
            onPress={() => setShowMethod("DELETE")}
            color="#A4DE02"
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#76BA1B",
    textAlign: "center"
  },
  button: {
    height: 40
  },
  input: {
    borderWidth: 2,
    width: 300,
    margin: 10,
    borderStyle: "solid",
    borderColor: "red",
    fontSize: 10,
    padding: 10,
    color: "white" // Text color
  },
  optionsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 30
  },
  methodContainer: {
    position: "absolute",
    top: 50
  }
});
