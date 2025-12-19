import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const PendingTutorData = [
    { "id": 201, "name": "Alice Smith", "subject": "Physics", "email": "alice.s@example.com", "date": "2024-10-01" },
    { "id": 202, "name": "Bob Johnson", "subject": "History", "email": "bob.j@example.com", "date": "2024-09-28" },
    { "id": 203, "name": "Charlie Brown", "subject": "Chemistry", "email": "charlie.b@example.com", "date": "2024-10-05" },
    { "id": 204, "name": "Diana Prince", "subject": "Literature", "email": "diana.p@example.com", "date": "2024-10-06" },
];

const PendingTutors= ({ navigation }) => {

    const [tutorApplications, setTutorApplications] = useState(PendingTutorData);
    
    const [selectedIds, setSelectedIds] = useState(new Set());
    
    const hasSelection = selectedIds.size > 0;

    
    const toggleSelection = (tutorId) => {
        setSelectedIds(prevIds => {
            const newIds = new Set(prevIds);
            if (newIds.has(tutorId)) {
                newIds.delete(tutorId);
            } else {
                newIds.add(tutorId);
            }
            return newIds;
        });
    };

    

    const handleApprove = () => {
        if (!hasSelection) return Alert.alert("No Selection", "Please select at least one application to approve.");
        
        const count = selectedIds.size;
        Alert.alert("Confirm Approval", `Are you sure you want to approve ${count} application(s)?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Approve",
                onPress: () => {
                    // Filter out approved tutors from the list
                    setTutorApplications(prev => 
                        prev.filter(tutor => !selectedIds.has(tutor.id))
                    );
                    setSelectedIds(new Set()); // Clear selection
                    Alert.alert("Success", `${count} application(s) approved.`);
                }
            }
        ]);
    };

    const handleReject = () => {
        if (!hasSelection) return Alert.alert("No Selection", "Please select at least one application to reject.");
        
        const count = selectedIds.size;
        Alert.alert("Confirm Rejection", `Are you sure you want to reject ${count} application(s)?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Reject",
                style: "destructive",
                onPress: () => {
                    // Filter out rejected tutors from the list
                    setTutorApplications(prev => 
                        prev.filter(tutor => !selectedIds.has(tutor.id))
                    );
                    setSelectedIds(new Set()); // Clear selection
                    Alert.alert("Success", `${count} application(s) rejected.`);
                }
            }
        ]);
    };

    
    const renderTutorApplication = ({ item }) => {
        const isSelected = selectedIds.has(item.id);
        
        return (
            <TouchableOpacity 
                style={[confirmationStyles.row, isSelected && confirmationStyles.rowSelected]}
                onPress={() => toggleSelection(item.id)}
            >
                
                <View style={[
                    confirmationStyles.selectionIndicator, 
                    isSelected ? confirmationStyles.selectedIndicator : confirmationStyles.unselectedIndicator
                ]}>
                    {isSelected && <Text style={confirmationStyles.checkMark}>✓</Text>}
                </View>

                
                <Text style={confirmationStyles.cellName}> {item.name} </Text>
                <Text style={confirmationStyles.cellSubject}> {item.subject} </Text>
                <Text style={confirmationStyles.cellDate}> {item.date} </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>

            <View style={confirmationStyles.container}>
                <View style={confirmationStyles.topBar}>
                    <Text style={confirmationStyles.topBartxt}>Tutor Application Review ({tutorApplications.length} Pending)</Text>
                </View>

                
                <View style={confirmationStyles.header}>
                    <Text style={confirmationStyles.headingSelection}>Select</Text>
                    <Text style={confirmationStyles.headingName}>Tutor</Text>
                    <Text style={confirmationStyles.headingSubject}>Subject</Text>
                    <Text style={confirmationStyles.headingDate}>Date</Text>
                </View>

                
                <FlatList
                    data={tutorApplications}
                    renderItem={renderTutorApplication}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={() => (
                        <View style={confirmationStyles.emptyState}>
                            <Text style={confirmationStyles.emptyText}>No pending applications found.</Text>
                        </View>
                    )}
                />

                
                <View style={confirmationStyles.actionButtonContainer}>
                    <TouchableOpacity
                        style={[
                            confirmationStyles.bulkActionButton, 
                            confirmationStyles.approveButton,
                            !hasSelection && confirmationStyles.disabledButton
                        ]}
                        onPress={handleApprove}
                        disabled={!hasSelection}
                    >
                        <Text style={confirmationStyles.actionText}>Approve ({selectedIds.size})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            confirmationStyles.bulkActionButton, 
                            confirmationStyles.rejectButton,
                            !hasSelection && confirmationStyles.disabledButton
                        ]}
                        onPress={handleReject}
                        disabled={!hasSelection}
                    >
                        <Text style={confirmationStyles.actionText}>Reject ({selectedIds.size})</Text>
                    </TouchableOpacity>
                </View>
                
                
                <TouchableOpacity style={confirmationStyles.Backbtn}
                    activeOpacity={0.3}
                    onPress={() => { navigation.navigate('AdminHome') }}> 
                    <Text style={confirmationStyles.backtxt}>Back</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

// --- Styles based on the provided code structure ---
const confirmationStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 15, 
    },
    topBar: {
        backgroundColor: '#751f1fff',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 2,
        marginBottom: 15,
    },
    topBartxt: {
        color: '#e8ecf4',
        fontSize: 16,
        fontWeight: 'bold',
    },

    
    header: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 8,
        marginBottom: 5,
    },
    
    headingSelection: { 
        width: 50, 
        fontSize: 14, 
        fontWeight: 'bold' 
    }, 
    
    headingName: { flex: 2.2, fontSize: 14, fontWeight: 'bold' },
    headingSubject: { flex: 1.5, fontSize: 14, fontWeight: 'bold' },
    headingDate: { flex: 1.5, fontSize: 14, fontWeight: 'bold' },

    
    row: {
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: 4,
        marginHorizontal: 2,
        elevation: 1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
    },
    rowSelected: {
        borderColor: '#751f1fff',
        backgroundColor: '#f1f1ff', 
    },

    
    selectionIndicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#751f1fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    selectedIndicator: {
        backgroundColor: '#751f1fff',
        borderColor: '#751f1fff',
    },
    unselectedIndicator: {
        backgroundColor: '#fff',
    },
    checkMark: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 18,
    },

   
    cellName: { flex: 2.2, fontSize: 13, textAlign: "left" }, 
    cellSubject: { flex: 1.5, fontSize: 13, textAlign: "left" },
    cellDate: { flex: 1.5, fontSize: 13, textAlign: "left" },

    
    actionButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
    },
    bulkActionButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        elevation: 2,
    },
    approveButton: {
        backgroundColor: '#4CAF50', 
    },
    rejectButton: {
        backgroundColor: '#F44336', 
    },
    actionText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#BDBDBD', 
    },

    
    emptyState: {
        padding: 20,
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    emptyText: {
        fontSize: 16,
        color: '#555',
    },

    
    Backbtn: {
        alignSelf: 'flex-start',
        backgroundColor: '#751f1fff',
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginTop: 10,
        borderRadius: 12,
        width: 70,
        height: 40,
    },
    backtxt: {
        fontSize: 16,
        color: '#f1efe5ff',
    },
});

export default PendingTutors;