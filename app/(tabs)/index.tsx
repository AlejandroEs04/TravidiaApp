import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import MainCurrentTrip from '@/components/ui/MainCurrentTrip';
import MainTripContainer from '@/components/ui/MainTripContainer';
import { Colors } from '@/constants/Colors';
import { useAppContext } from '@/hooks/AppContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Trip } from '@/types';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const { trips } = useAppContext()
  const background = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background')
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null)

  const normalizeDate = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const getActiveTrip = (trips: Trip[]): Trip | null => {
    const today = normalizeDate(new Date());

    return trips.find(trip => {
      const departure = normalizeDate(new Date(trip.departureDate));
      const returned = normalizeDate(new Date(trip.returnedDate));

      return departure <= today && today <= returned;
    }) || null;
};

  useEffect(() => {
    const trip = getActiveTrip(trips)
    if(trip) setActiveTrip(trip)
  }, [trips])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{light: background, dark: background}}
      headerImage={<Image style={styles.image} source={"https://images.unsplash.com/photo-1532968682779-218bea4f06c3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />}
    >
      <View>
        <ScrollView horizontal style={{ paddingBottom: 8 }} >
          <View style={[styles.actionCard, { backgroundColor: '#e3e3e3' }]}>
            <ThemedText style={{ color: '#000', fontSize: 16 }}>New Trip Request</ThemedText>
          </View>
          <View style={[styles.actionCard, { backgroundColor: '#e3e3e3' }]}>
            <ThemedText style={{ color: '#000', fontSize: 16 }}>Expenses Report</ThemedText>
          </View>
          <View style={[styles.actionCard, { backgroundColor: '#e3e3e3' }]}>
            <ThemedText style={{ color: '#000', fontSize: 16 }}>Pending Approvations</ThemedText>
          </View>
          <View style={[styles.actionCard, { backgroundColor: '#e3e3e3' }]}>
            <ThemedText style={{ color: '#000', fontSize: 16 }}>Report Issues</ThemedText>
          </View>
        </ScrollView>
      </View>

      {activeTrip && (
        <Pressable>
          <MainCurrentTrip trip={activeTrip} />
        </Pressable>
      )}

      <View>
        <ThemedText type='title'>Business Trip</ThemedText>

        <View style={{ gap: 10 }}>
          {trips.map(trip => (
            <MainTripContainer key={trip.id} trip={trip} />
          ))}
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
  actionCard: {
    color: '#fff',
    padding: 10,
    borderRadius: 15, 
    justifyContent: 'center', 
    marginRight: 5,
  }
});
