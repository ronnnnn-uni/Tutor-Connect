import { FlatList, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const PlaceholderData = [
 { "id": 1, "student": "User", "time": "11/26/25 1:00PM -  3:00PM","subject":"Math" ,"status": "Pending Confirmation" },

];

const renderItem = ({item}) => (
        <View style = {styles.row}>
            <Text style = {styles.cellS}> {item.student} </Text>
            <Text style = {styles.cellL}> {item.time} </Text>
            <Text style = {styles.cellM}> {item.status} </Text>
        </View>
    );

const TutorSchedule = ({navigation}) => {


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            
            <View style = {styles.container}>
                <View style = {styles.topBar}>
                    <Text style = {styles.topBartxt}>Schedule</Text>
                </View>
                
                <View  style = {styles.header}>
                    <Text style = {styles.heading}> Student </Text>
                    <Text style = {styles.heading}> Date & Time </Text>
                    <Text style = {styles.heading}> Status </Text>
                </View>

                <FlatList 
                data={PlaceholderData}
                renderItem={renderItem} 
                keyExtractor={(item) => item.id.toString() }
                />
                <TouchableOpacity style = {styles.Editbtn}
                activeOpacity={0.3}
                onPress={() => {

                }} >
                    <View>
                        <Text style = {styles.EditTxt}>Edit</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style = {styles.footer}>
                <TouchableOpacity style = {styles.Backbtn}
                activeOpacity={0.3}
                onPress={() => {
                // handle onPress
                navigation.navigate('TutorHome')
              }}>

                    <Text style = {styles.backtxt}>Back</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );

};

const styles = StyleSheet.create ({

container: {
    paddingVertical: 30,
    paddingHorizontal: 20, 
}, 

topBar: {

    backgroundColor: '#751f1fff' ,
    paddingHorizontal: 12 , 
    paddingVertical: 10 , 
    borderRadius: 5 ,
    elevation: 2 ,
    marginBottom: 15 ,

} , 

topBartxt: {
    color: '#e8ecf4',
    fontSize: 16 ,
} ,

header: {
    flexDirection: "row" ,
    justifyContent: "space-between" ,
    padding: 10 ,
} ,

heading: {
    flex: 1.5 ,
    fontSize: 15 ,
} ,

row: {
    flexDirection: "row" ,
    justifyContent: "space-between" ,
    marginVertical: 10 ,
    marginHorizontal: 2 ,
    elevation: 1 ,
    borderRadius: 8 ,
    borderColor: "#fff", 
    padding: 10 ,
    backgroundColor: '#e8ecf4' ,
} ,

cellS: {
    fontSize: 14 ,
    textAlign: "left" ,
    flex: 1 ,
} ,

cellM: {
    fontSize: 14 ,
    textAlign: "left" ,
    flex: 1.5 ,
} ,

cellL: {
    fontSize: 14 ,
    textAlign: "center" ,
    flex: 2 ,
    paddingHorizontal: 5 ,
} ,

 footer: {
    padding: 20,
    backgroundColor: '#e8ecf4',
  },

Backbtn: {
    backgroundColor: '#751f1f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
    width: 80,
    alignItems: 'center',
} ,

backtxt: {
    fontSize: 16 , 
    color: '#f1efe5ff',
} , 

Editbtn: {
    backgroundColor: '#751f1fff',
    marginLeft: 4 ,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 5 ,
    borderRadius: 12,
    width: 55,
    height: 35 ,
} , 

EditTxt: {
    fontSize: 13 , 
    color: '#f1efe5ff',
} ,


});


export default TutorSchedule;