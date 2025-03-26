import { FontAwesome } from "@expo/vector-icons";
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    id: "1",
    name: "Sales 1",
    total: 1500000,
    date: "2025-03-26 17:00:00",
  },
  {
    id: "2",
    name: "Sales 2",
    total: 2000000,
    date: "2024-03-27 17:00:00",
  },
  {
    id: "3",
    name: "Sales 3",
    total: 2500000,
    date: "2024-03-28 17:00:00",
  },
  {
    id: "4",
    name: "Sales 4",
    total: 3000000,
    date: "2024-03-29 17:00:00",
  }
]

type ItemProps = {
  name: string
  total: number
  date: string
}

const Item = ({ name, total, date }: ItemProps) => {
  const formattedDate = getTimeDifference(date)
  const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    maximumFractionDigits: 0 }).format(total)
  return (
    <View style={styles.setoranContainer}>
      <View>
        <Text>{name}</Text>
        <Text>{formattedDate}</Text>
      </View>
      <View>
        <Text style={{color: "#009951", fontSize: 20}}>{formattedTotal}</Text>
      </View>
    </View>
  )
}


const getTimeDifference = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}


export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          {/* <View style={styles.topHeaderContainer}>
            <View>
              <FontAwesome name="user-circle" size={38} color="black" />
            </View>
            <View style={styles.calendarIcon}>
              <FontAwesome name="calendar" size={24} color="#6A74EF" />
            </View>
          </View> */}
          <View style={styles.boxBlueContainer}>
            <Text style={styles.fontColorWhite}>Total hari ini</Text>
            <Text style={styles.fontColorWhite}>Rp 1.500.000</Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20 }}>
              <Text>Setoran hari ini</Text>
              <Text>Riwayat</Text>
            </View>
            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <Item name={item.name} total={item.total} date={item.date} />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.floatingButton}>
          <Text style={{ color: "#fff", textAlign: "center", fontSize: 20, fontWeight:"500" }}>Tambah Setoran</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: "#fff",
    padding: 20,
    flex: 1,
  },
  topHeaderContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  calendarIcon:{
    borderColor: "#6A74EF",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  boxBlueContainer:{
    backgroundColor: "#6A74EF",
    paddingHorizontal: 20,
    paddingVertical: 60,
    borderRadius: 10,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fontColorWhite:{
    color: "#fff",
    fontSize: 20,
  },
  setoranContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  floatingButton:{
    backgroundColor: "#6A74EF",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  }
})