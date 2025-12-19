import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';


const BookAppointment = ({navigation}) => {


const [open, setOpen] = useState(false);
const [value, setValue] = useState(null);
const [tutor, setTutor] = useState([
    {label: 'Gerald Anderson', value: 'Gerald'},
    {label: 'Pia Wurtzbach', value: 'Pia'},
    {label: 'Alden Richards', value: 'Alden'},
]);


const [date, setDate] = useState(new Date()); 
// startTime and endTime store the hour/minute component
const [startTime, setStartTime] = useState(new Date()); 
const [endTime, setEndTime] = useState(new Date(Date.now() + 60 * 60 * 1000)); 



const onDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
        // We only update the date part, preserving the time part of startTime
        const newDate = new Date(selectedDate);
        newDate.setHours(startTime.getHours());
        newDate.setMinutes(startTime.getMinutes());
        setDate(newDate);
        setStartTime(newDate);

        // Update endTime to maintain the duration relative to the new date
        const newEndTime = new Date(newDate);
        newEndTime.setHours(endTime.getHours());
        newEndTime.setMinutes(endTime.getMinutes());
        setEndTime(newEndTime);
    }
};

const onStartTimeChange = (event, selectedTime) => {
    if (selectedTime !== undefined) {
        // Update the hour/minute of the stored date object
        setStartTime(selectedTime); 
    }
};

const onEndTimeChange = (event, selectedTime) => {
    if (selectedTime !== undefined) {
        setEndTime(selectedTime);
    }
};


const showDatepicker = () => {
    DateTimePickerAndroid.open({
        value: date,
        onChange: onDateChange,
        mode: 'date',
    });
};

const showStartTimepicker = () => {
    DateTimePickerAndroid.open({
        value: startTime,
        onChange: onStartTimeChange,
        mode: 'time',
        is24Hour: true,
    });
};

const showEndTimepicker = () => {
    DateTimePickerAndroid.open({
        value: endTime,
        onChange: onEndTimeChange,
        mode: 'time',
        is24Hour: true,
    });
};


    return (
        <SafeAreaView style ={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            <View style = {styles.container}>
                <Text style = {styles.Heading}>Book Appointment</Text>

                <View style = {styles.ApptForm}>
                    <Text style={styles.label}>Select Tutor:</Text>
                    <View style={{ zIndex: 1000 }}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={tutor}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setTutor}
                            placeholder="Choose a tutor..."
                            style={styles.dropdown}
                        />
                    </View>

                    
                    <Text style={styles.label}>Select Date:</Text>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.dateDisplay}>
                            {date.toLocaleDateString()}
                        </Text>
                        <TouchableOpacity
                            onPress={showDatepicker}
                            activeOpacity={0.8}
                            style={[styles.timeButton, { backgroundColor: '#8e2712' }]}
                        >
                            <Text style={styles.timeButtonText}>Choose Date</Text>
                        </TouchableOpacity>
                    </View>

                    
                    <Text style={styles.label}>Start Time:</Text>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.dateDisplay}>
                            {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                        <TouchableOpacity
                            onPress={showStartTimepicker}
                            activeOpacity={0.8}
                            style={[styles.timeButton, { backgroundColor: '#8e2712' }]}
                        >
                            <Text style={styles.timeButtonText}>Choose Time</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                    <Text style={styles.label}>End Time:</Text>
                    <View style={styles.pickerContainer}>
                        <Text style={styles.dateDisplay}>
                            {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                        <TouchableOpacity
                            onPress={showEndTimepicker}
                            activeOpacity={0.8}
                            style={[styles.timeButton, { backgroundColor: '#8e2712' }]}
                        >
                            <Text style={styles.timeButtonText}>Choose Time</Text>
                        </TouchableOpacity>
                    </View>

                    
                    <View style={styles.bookButtonContainer}>
                        <TouchableOpacity
                            onPress={() => alert(`Appointment with ${value} on ${date.toDateString()} from ${startTime.toLocaleTimeString()} to ${endTime.toLocaleTimeString()}`)}
                            activeOpacity={0.8}
                            disabled={!value || startTime >= endTime} 
                            style={[
                                styles.bookButton,
                                { backgroundColor: (!value || startTime >= endTime) ? '#ccc' : '#711414' } 
                            ]}
                        >
                            <Text style={styles.bookButtonText}>Book Now</Text>
                        </TouchableOpacity>
                    </View>

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
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({

    container: {
        padding: 20,
    },

    Heading: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: "auto",
        marginBottom: 20,
    },

    ApptForm: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#C9D3DB',
    } ,

    label: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
        color: '#555',
    },

    dropdown: {
        borderColor: '#ddd',
        minHeight: 45, 
    },

    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5, 
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        marginBottom: 10, 
    },

    dateDisplay: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        paddingLeft: 5,
    },

    bookButtonContainer: {
        marginTop: 30,
        borderRadius: 8,
        overflow: 'hidden', 
    },
    
    
    bookButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    
    
    timeButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    } ,

    Backbtn: {
    marginLeft: 5 ,
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

  
});


export default BookAppointment;