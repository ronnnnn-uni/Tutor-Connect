import React from 'react';
import Logo from '../assets/logo.png';
import Calendar from '../assets/calendar.png';
import Appointment from '../assets/appointment.png';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const TutorHome = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <ScrollView style={styles.container}>
        <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={Logo} />


        <View style = {styles.ProfileCard}>
            <Text style = {styles.Profileheading}>Welcome !</Text>
            <Text style = {styles.ProfileInfo}>Tutor Name</Text>
            <Text style = {styles.ProfileInfo}>Tutor ID</Text>
        </View> 


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.cardGrid}>
            <TouchableOpacity style={styles.card} onPress={() => {
                // handle onPress
                navigation.navigate('ManageAppointment')
              }}>
              <Image
              resizeMode='contain'
              style = {styles.ActionIcon}
              source={Calendar}
              />
              <Text style={styles.cardText}>Manage Appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => {
                // handle onPress
                navigation.navigate('TutorSchedule')
              }}>
              <Image
              resizeMode='contain'
              style = {styles.ActionIcon}
              source={Appointment}
              />
              <Text style={styles.cardText}>My Schedule</Text>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Appointment</Text>

          <View style={styles.appointmentCard}>
            <Text style={styles.apptLabel}>Student:</Text>
            <Text style={styles.apptInfo}>USER</Text>

            <Text style={styles.apptLabel}>Date & Time:</Text>
            <Text style={styles.apptInfo}>November 26, 2025 • 1:00 PM - 3:00 PM</Text>

            <Text style={styles.apptLabel}>Status:</Text>
            <Text style={styles.apptStatus}>Pending Confirmation</Text>

            <View style={styles.apptActions}>
              <TouchableOpacity style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.editText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <View style={styles.LogoutBtn}>
            <TouchableOpacity
                onPress={() => {
                // handle onPress
                navigation.navigate('LoginScreen')
                }}>
                <View>
                    <Text style={styles.LogoutBtnText}>Logout</Text>
                </View>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D2A32',
    marginTop: 10,
    textAlign: 'center',
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#751f1fff',
    marginBottom: 15,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#C9D3DB',
    borderWidth: 1,
  },
  icon: {
    fontSize: 40,
    textAlign: 'center',
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#1D2A32',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C9D3DB',
  },
  apptLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    color: '#222',
  },
  apptInfo: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D2A32',
  },
  apptStatus: {
    fontSize: 16,
    fontWeight: '700',
    color: '#751f1fff',
    marginTop: 5,
  },
  apptActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelBtn: {
    backgroundColor: '#ffe5e5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelText: {
    color: '#B00020',
    fontWeight: '600',
  },
  editBtn: {
    backgroundColor: '#751f1fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
  },
 
  headerImg: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  } ,

  LogoutBtn: {
    backgroundColor: '#751f1fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15 ,
    borderRadius: 12,
    width: 90,
    height: 50 ,
  } , 

  LogoutBtnText: {
    color: '#fff',
    fontWeight: '600',
  } , 

  ProfileCard: {
    alignItems: 'center' ,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C9D3DB' ,
  } , 

  Profileheading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#751f1fff',
    marginBottom: 8 ,
  } , 

  ProfileInfo: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D2A32'
    
  },

  ActionIcon: {
    width: 50,
    height: 50,
    alignSelf: 'center'

  } , 

});

export default TutorHome;