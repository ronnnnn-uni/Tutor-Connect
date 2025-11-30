import { FlatList, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const PlaceholderData = [
 { "id": 1, "tutor": "Gerald", "time": "Nov 26, 2025 1:00PM -  3:00PM","subject":"Math" ,"status": "Pending Confirmation" },

];



const ScheduleScreen = ({navigation}) => {

    const renderItem = ({item}) => (
        <View style = {styles.row}>
            <Text style = {styles.cell}> {item.tutor} </Text>
            <Text style = {styles.cell}> {item.time} </Text>
            <Text style = {styles.cell}> {item.status} </Text>
        </View>
    ) 

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            
            <View style = {styles.container}>
                <View style = {styles.topBar}>
                    <Text style = {styles.topBartxt}>Schedule</Text>
                </View>
                
                <View  style = {styles.header}>
                    <Text style = {styles.heading}> Tutor </Text>
                    <Text style = {styles.heading}> Date & Time </Text>
                    <Text style = {styles.heading}> Status </Text>
                </View>

                <FlatList 
                data={PlaceholderData}
                renderItem={renderItem} 
                keyExtractor={(item) => {item.id.toString() }}
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

            <View>
                <TouchableOpacity style = {styles.Backbtn}
                activeOpacity={0.3}
                onPress={() => {
                // handle onPress
                navigation.navigate('StudentHome')
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
    paddingHorizontal: 30, 
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
    flex: 1 ,
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

cell: {
    fontSize: 14 ,
    textAlign: "left" ,
    flex: 1 ,
} ,


Backbtn: {
    marginLeft: 10 ,
    backgroundColor: '#751f1fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 15 ,
    borderRadius: 12,
    width: 70,
    height: 40 ,
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


export default ScheduleScreen;