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

type SetoranProduk = {
  id: string;
  name: string;
  harga: number;
  jumlah: number;
  subtotal: number;
  deskripsi: string;
}

export default function TambahSetoranScreen() {
  const [sales, setSales] = useState<string>("");
  const colorScheme = useColorScheme();
  const [salesName, setSalesName] = useState<SalesName[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSales, setSelectedSales] = useState<SalesName | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [setoranProduk, setSetoranProduk] = useState<any[]>([]);

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
    console.log(setoranProduk);

  },[setoranProduk]);

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

  // Handler to add produk
  const handleAddProduk = (produkBaru: any) => {
    setSetoranProduk((prev) => [...prev, produkBaru]);
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
          justifyContent: "flex-start",
        }}
      >
        {/* Sales Selection UI */}
        <Text
          style={{
            color: colorScheme === "dark" ? "#94a3b8" : "#64748b",
            marginBottom: 8,
          }}
        >
          Pilih sales yang akan menerima setoran:
        </Text>

        {!selectedSales ? (
          // Show input if no sales selected
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
                borderWidth: 0,
              }}
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="while-editing"
              selectionColor={colorScheme === "dark" ? "#f1f5f9" : "#1e293b"}
            />
          </View>
        ) : (
          // Show selected sales as a chip/button
          <TouchableOpacity
            onPress={() => {
              setSelectedSales(null);
              setSales("");
              setIsOpen(true);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-start",
              backgroundColor: colorScheme === "dark" ? "#334155" : "#e0e7ef",
              borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 18,
              marginBottom: 16,
              marginTop: 2,
              borderWidth: 1,
              borderColor: colorScheme === "dark" ? "#475569" : "#6A74EF",
            }}
            activeOpacity={0.8}
          >
            <MaterialIcons name="person" size={20} color={colorScheme === "dark" ? "#f1f5f9" : "#2421A2"} />
            <Text
              style={{
                color: colorScheme === "dark" ? "#f1f5f9" : "#2421A2",
                fontWeight: "bold",
                marginLeft: 8,
                fontSize: 16,
              }}
            >
              {selectedSales.name}
            </Text>
            <MaterialIcons name="close" size={18} color={colorScheme === "dark" ? "#f1f5f9" : "#2421A2"} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}

        {/* Dropdown remains unchanged */}
        {sales.trim() !== "" && isOpen && !selectedSales && (
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
                      backgroundColor: "transparent",
                    }}
                    onPress={() => handleSalesChange(item)}
                  >
                    <Text
                      style={{
                        color:
                          colorScheme === "dark"
                            ? "#f1f5f9"
                            : "#1e293b",
                        fontWeight: "normal",
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

        {/* Daftar Produk Ditambahkan */}
        {setoranProduk.length > 0 && (
          <View
            style={{
              marginTop: 24,
              marginBottom: 16,
              borderRadius: 16,
              backgroundColor: colorScheme === "dark" ? "#334155" : "#f8fafc",
              borderWidth: 1,
              borderColor: colorScheme === "dark" ? "#475569" : "#e5e7eb",
              shadowColor: "#000",
              shadowOpacity: 0.04,
              shadowRadius: 6,
              elevation: 1,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: colorScheme === "dark" ? "#f1f5f9" : "#1e293b",
                paddingHorizontal: 20,
                paddingTop: 16,
                paddingBottom: 8,
              }}
            >
              Produk Ditambahkan
            </Text>
            {setoranProduk.map((item, idx) => (
              <View
                key={item.id + idx}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderTopWidth: idx === 0 ? 0 : 1,
                  borderColor: colorScheme === "dark" ? "#475569" : "#e5e7eb",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: colorScheme === "dark" ? "#f1f5f9" : "#1e293b",
                      marginBottom: 2,
                    }}
                    numberOfLines={1}
                  >
                    {item.nama || item.name}
                  </Text>
                  <Text
                    style={{
                      color: "#64748b",
                      fontSize: 13,
                    }}
                  >
                    Harga: Rp {item.harga?.toLocaleString()} x {item.jumlah}
                  </Text>
                </View>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#059669",
                    fontSize: 16,
                    marginLeft: 16,
                    minWidth: 90,
                    textAlign: "right",
                  }}
                >
                  Rp {item.subtotal?.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
      
      {/* Floating Action Button */}
      {!openSheet && (
        <TouchableOpacity
          onPress={() => handleSheetChange(true)}
          style={{
            position: "absolute",
            bottom: Platform.OS === "android" ? 60 : 32, // More space on Android
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
          <BottomSheetSetoran
            setOpenSheet={setOpenSheet}
            setSetoranProduk={handleAddProduk}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}