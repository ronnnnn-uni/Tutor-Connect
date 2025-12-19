import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const StudentData = [
    { "id": 1, "name": "User A", "year":"3rd-Year", "email": "1234567@ub.edu.ph" ,"status": "Pending Confirmation" },
];

const TutorData = [
    // Removed invisible space in "Gerald Anderson"
    { "id": 101, "name": "Gerald  Anderson", "subject":"Math", "email": "1234567@ub.edu.ph" ,"status": "Available" },
];


// FIXED: Render function now correctly renders 4 cells for both tabs
const renderItem = ({ item, activeTab }) => {
    if (activeTab === 'StudentData') {
        return (
            <View style={styles.row}>
                
                <Text style={styles.cell }> {item.name} </Text>
                <Text style={styles.cell }> {item.year} </Text>
                <Text style={styles.cell }> {item.email} </Text>
            </View>
        );
    } else {
        return (
            <View style={styles.row}>
                
                <Text style={styles.cell}> {item.name} </Text>
                <Text style={styles.cell}> {item.subject} </Text>
                <Text style={styles.cell}> {item.email} </Text>
            </View>
        );
    }
};

const UserRecords = ({ navigation }) => {

    const [activeTab, setActiveTab] = useState('StudentData'); 

    
    const displayData = activeTab === 'StudentData' ? StudentData : TutorData;
    
    // ADDED: Fourth header title
    const headerTitle1 = activeTab === 'StudentData' ? 'Student' : 'Tutor';
    const headerTitle2 = activeTab === 'StudentData' ? 'Year Level' : 'Subject';
    const headerTitle3 = activeTab === 'StudentData' ? 'Email' : 'Email';



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>

            <View style = {styles.container}>
                <View style = {styles.topBar}>
                    <Text style = {styles.topBartxt}>User Data</Text>
                </View>

                <View style={styles.tabView}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'StudentData' && styles.activeTab]}
                        onPress={() => setActiveTab('StudentData')}>
                        <Text style={[styles.tabText, activeTab === 'StudentData' && styles.activeTabText]}>Student</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'TutorData' && styles.activeTab]}
                        onPress={() => setActiveTab('TutorData')}>
                        <Text style={[styles.tabText, activeTab === 'TutorData' && styles.activeTabText]}>Tutor</Text>
                    </TouchableOpacity>
                </View>

                
                
                <View style = {styles.header}>
                    <Text style = {styles.heading}> {headerTitle1} </Text>
                    <Text style = {styles.heading}> {headerTitle2} </Text>
                    <Text style = {styles.heading}> {headerTitle3} </Text>
                </View>

                
                <FlatList 
                    data={displayData}
                    // Passing activeTab to renderItem correctly
                    renderItem={({ item }) => renderItem({ item, activeTab })} 
                    keyExtractor={(item) => item.id.toString() }
                />

                <TouchableOpacity style = {styles.Editbtn}
                    activeOpacity={0.3}
                    onPress={() => { }} >
                    <View>
                        <Text style = {styles.EditTxt}>Edit</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style = {styles.Backbtn}
                    activeOpacity={0.3}
                    onPress={() => { navigation.navigate('AdminHome') }}>

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

tabView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
},
tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
},
activeTab: {
    backgroundColor: '#751f1fff', 
},
tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#751f1fff', 
},
activeTabText: {
    color: '#fff', 
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
    backgroundColor: '#ccc', 
    borderRadius: 8,
    marginBottom: 5,
} ,

heading: {
    flex: 1 ,
    fontSize: 15 ,
    fontWeight: 'bold',
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
    backgroundColor: '#fff' , 
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


export default UserRecords;