import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const BookAppointment = ({ navigation }) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [tutor, setTutor] = useState([
        { label: 'Gerald Anderson', value: 'Gerald' },
        { label: 'Pia Wurtzbach', value: 'Pia' },
        { label: 'Alden Richards', value: 'Alden' },
    ]);

    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date(Date.now() + 60 * 60 * 1000));

    // Helper: Check if form is valid (for the Update button)
    const isFormInvalid = !value || startTime >= endTime;

    const onDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            const newDate = new Date(selectedDate);
            newDate.setHours(startTime.getHours());
            newDate.setMinutes(startTime.getMinutes());
            setDate(newDate);
            setStartTime(newDate);

            const newEndTime = new Date(newDate);
            newEndTime.setHours(endTime.getHours());
            newEndTime.setMinutes(endTime.getMinutes());
            setEndTime(newEndTime);
        }
    };

    const onStartTimeChange = (event, selectedTime) => {
        if (selectedTime !== undefined) {
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

    // Handler for Update (Save changes)
    const handleUpdate = () => {
        Alert.alert("Success", `Appointment updated with ${value} on ${date.toDateString()} from ${startTime.toLocaleTimeString()} to ${endTime.toLocaleTimeString()}`);
    };

    // Handler for Cancel (Delete Appointment)
    const handleCancel = () => {
        Alert.alert(
            "Cancel Appointment", 
            "Are you sure you want to cancel this appointment? This action cannot be undone.",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancellation aborted"),
                    style: "cancel"
                },
                {
                    text: "Yes, Cancel Appointment",
                    style: 'destructive', 
                    onPress: () => {
                        
                        console.log("Appointment cancelled/deleted");
                        
                        //Notify the user
                        Alert.alert("Appointment Cancelled", "Your appointment has been successfully removed.");
                        
                        //Reset the form to indicate the appointment is gone
                        setValue(null); 
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            <View style={styles.container}>
                <Text style={styles.Heading}>Edit Appointment</Text>

                <View style={styles.ApptForm}>
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

                    
                    <View style={styles.actionContainer}>
                        
                        <TouchableOpacity
                            onPress={handleCancel}
                            activeOpacity={0.8}
                            style={[styles.actionButton, styles.cancelBtn]}
                        >
                            <Text style={styles.cancelBtnText}>Cancel</Text>
                        </TouchableOpacity>

                        
                        <TouchableOpacity
                            onPress={handleUpdate}
                            activeOpacity={0.8}
                            disabled={isFormInvalid}
                            style={[
                                styles.actionButton, 
                                styles.updateBtn,
                                isFormInvalid && styles.disabledBtn
                            ]}
                        >
                            <Text style={styles.updateBtnText}>Update</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                
                
                <View>
                    <TouchableOpacity 
                        style={styles.Backbtn}
                        activeOpacity={0.3}
                        onPress={() => navigation.navigate('TutorHome')}>
                        <Text style={styles.backtxt}>Back</Text>
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
        alignSelf: "center",
        marginBottom: 20,
    },
    ApptForm: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#C9D3DB',
    },
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
    },

    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        gap: 10,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelBtn: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#711414',
    },
    cancelBtnText: {
        color: '#711414',
        fontSize: 16,
        fontWeight: 'bold',
    },
    updateBtn: {
        backgroundColor: '#711414',
    },
    updateBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledBtn: {
        backgroundColor: '#ccc',
    },

    Backbtn: {
        marginLeft: 5,
        backgroundColor: '#751f1fff',
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginTop: 15,
        borderRadius: 12,
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backtxt: {
        fontSize: 16,
        color: '#f1efe5ff',
    },
});

export default BookAppointment;