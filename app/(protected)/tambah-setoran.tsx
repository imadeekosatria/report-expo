import { BottomSheetSetoran } from "@/components/bottom-sheet";
import { getSalesName } from "@/utils/salesApi";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

type SalesName = {
  id: string;
  name: string;
};

export default function TambahSetoranScreen() {
  const [sales, setSales] = useState<string>("");
  const colorScheme = useColorScheme();
  const [salesName, setSalesName] = useState<SalesName[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSales, setSelectedSales] = useState<SalesName | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);

  const filteredData = useMemo(() => {
    if (!sales.trim() || !Array.isArray(salesName)) return [];
    return salesName.filter(
      (item) =>
        item &&
        item.name &&
        item.name.toLowerCase().includes(sales.toLowerCase())
    );
  }, [sales, salesName]);

  useEffect(() => {
    const fetchSalesName = async () => {
      if (!sales.trim()) {
        setSalesName([]);
        return;
      }
      setIsLoading(true);
      const response = await getSalesName(sales);
      if (typeof response === "string") {
        setError(response);
        setSalesName([]);
      } else {
        setError(null);
        setSalesName(Array.isArray(response.data) ? response.data : []);
      }
      setIsLoading(false);
    };

    const timeOutId = setTimeout(() => {
      fetchSalesName();
    }, 300);

    return () => clearTimeout(timeOutId);
  }, [sales]);

  const handleSalesChange = (sales: SalesName) => {
    setSelectedSales(sales);
    setSales(sales.name);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (selectedSales) {
      setSales("");
      setSelectedSales(null);
    }
  };

  const handleSheetChange = (open: boolean) => {
    setOpenSheet(open);
  };

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ 
            flex: 1,
            backgroundColor: colorScheme === "dark" ? "#1e293b" : "#fff", // always white in light mode
            padding: 20, 
        }}
        // keyboardVerticalOffset={100}
      >
        <View
          style={{
            flex: 1,
            paddingTop: 0,
            justifyContent: "flex-start",
          }}
        >
          {/* <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: colorScheme === "dark" ? "#f1f5f9" : "#1e293b",
              marginBottom: 16,
            }}
          >
            Tambah Setoran
          </Text> */}
          <Text
            style={{
              color: colorScheme === "dark" ? "#94a3b8" : "#64748b",
              marginBottom: 8,
            }}
          >
            Pilih sales yang akan menerima setoran:
          </Text>
          <View
            style={{
              marginBottom: 12,
              borderRadius: 12,
              backgroundColor: colorScheme === "dark" ? "#334155" : "#fff",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
              borderWidth: 1,
              borderColor: colorScheme === "dark" ? "#475569" : "#e5e7eb",
            }}
          >
            <TextInput
              placeholder="Cari nama sales"
              onChangeText={setSales}
              value={sales}
              onFocus={handleInputFocus}
              placeholderTextColor={colorScheme === "dark" ? "#cbd5e1" : "#64748b"}
              style={{
                color: colorScheme === "dark" ? "#f1f5f9" : "#1e293b",
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 16,
                borderRadius: 12,
                backgroundColor: colorScheme === "dark" ? "#334155" : "#fff",
                borderWidth: 0, // border handled by parent View
              }}
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="while-editing"
              selectionColor={colorScheme === "dark" ? "#f1f5f9" : "#1e293b"}
            />
          </View>
          {sales.trim() !== "" && isOpen && (
            <View
              style={{
                marginBottom: 12,
                borderRadius: 12,
                backgroundColor: colorScheme === "dark" ? "#334155" : "#fff",
                maxHeight: 320,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: colorScheme === "dark" ? "#475569" : "#e5e7eb",
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={true}
                indicatorStyle={colorScheme === "dark" ? "white" : "black"}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {isLoading ? (
                  <View style={{ padding: 24 }}>
                    <Text
                      style={{
                        color: colorScheme === "dark" ? "#94a3b8" : "#64748b",
                        textAlign: "center",
                      }}
                    >
                      Memuat...
                    </Text>
                  </View>
                ) : error ? (
                  <View style={{ padding: 24 }}>
                    <Text
                      style={{
                        color: colorScheme === "dark" ? "#f87171" : "#dc2626",
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </Text>
                  </View>
                ) : filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderBottomWidth:
                          index < filteredData.length - 1 ? 1 : 0,
                        borderColor:
                          colorScheme === "dark" ? "#475569" : "#e5e7eb",
                        backgroundColor:
                          selectedSales?.id === item.id
                            ? colorScheme === "dark"
                              ? "#475569"
                              : "#e0e7ef"
                            : "transparent",
                      }}
                      onPress={() => handleSalesChange(item)}
                    >
                      <Text
                        style={{
                          color:
                            colorScheme === "dark"
                              ? "#f1f5f9"
                              : "#1e293b",
                          fontWeight:
                            selectedSales?.id === item.id ? "bold" : "normal",
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={{ padding: 24 }}>
                    <Text
                      style={{
                        color: colorScheme === "dark" ? "#94a3b8" : "#64748b",
                        textAlign: "center",
                      }}
                    >
                      Tidak ada hasil ditemukan
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
          {selectedSales && (
            <View
              style={{
                marginTop: 8,
                marginBottom: 16,
                padding: 12,
                borderRadius: 10,
                backgroundColor: colorScheme === "dark" ? "#334155" : "#f1f5f9",
              }}
            >
              <Text
                style={{
                  color: colorScheme === "dark" ? "#f1f5f9" : "#1e293b",
                  fontWeight: "500",
                }}
              >
                Sales terpilih: {selectedSales.name}
              </Text>
            </View>
          )}
        </View>
        {/* Floating Action Button */}
        {!openSheet && (
          <TouchableOpacity
            onPress={() => handleSheetChange(true)}
            style={{
              position: "absolute",
              bottom: 44, // changed from 32 to 16 for better alignment with header present
              right: 24,
              backgroundColor: "#2421A2",
              borderRadius: 32,
              padding: 18,
              elevation: 6,
              shadowColor: "#2421A2",
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              zIndex: 20,
            }}
            activeOpacity={0.85}
          >
            <MaterialIcons name="add" size={28} color="white" />
          </TouchableOpacity>
        )}
        {/* Bottom Sheet */}
        {openSheet && (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              backgroundColor: colorScheme === "dark" ? "#0f172a99" : "#0002",
              zIndex: 30,
              justifyContent: "flex-end",
            }}
          >
            <BottomSheetSetoran setOpenSheet={setOpenSheet} />
          </View>
        )}
      </KeyboardAvoidingView>
  );
}