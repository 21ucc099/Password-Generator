import { StyleSheet, ScrollView } from "react-native";

import PasswordGenerator from "./src/PasswordGenerator";



function App(){
  return(
    <ScrollView>
      <PasswordGenerator />
    </ScrollView>
  )
}

const styles = StyleSheet.create({

})

export default App;