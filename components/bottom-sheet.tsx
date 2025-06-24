import BottomSheet, { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { getAllProducts } from "../utils/produkApi"; // 1. Import your API

type Props = {
    setOpenSheet: (value: boolean) => void;
}

export const BottomSheetSetoran = ({ setOpenSheet }: Props) => {
    const colorScheme = useColorScheme();
    const snapPoints = useMemo(() => ['70%', '95%'], []);
    const bottomSheetRef = useRef<BottomSheet>(null)
    // const [pressed, setPressed] = useState<boolean>(false);
    const [produk, setProduk] = useState<string>('');
    const [isProductSelected, setIsProductSelected] = useState(false);
    const [useHargaSatuan, setUseHargaSatuan] = useState(false);

    // 1. Change productList to store full product objects
    const [productList, setProductList] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [loadingProducts, setLoadingProducts] = useState(false);

    // 2. Fetch and store full product objects
    useEffect(() => {
        setLoadingProducts(true);
        getAllProducts().then((data) => {
            if (Array.isArray(data)) {
                setProductList(data); // store all product objects
            }
            setLoadingProducts(false);
        });
    }, []);

    // 3. Filtering and matching logic
    const matchedProduct = productList.find(
        (p) => (p.nama || p.name || "").toLowerCase() === produk.trim().toLowerCase()
    );

    const filteredProducts = useMemo(() => {
        if (!produk.trim()) return productList;
        return productList.filter((p) =>
            (p.nama || p.name || "").toLowerCase().includes(produk.trim().toLowerCase())
        );
    }, [produk, productList]);

    // 4. Selection handler
    const handleSelectProduct = (p: any) => {
        setProduk(p.nama || p.name || "");
        setSelectedProduct(p);
        setIsProductSelected(true);
    };

    const handleSheetChange = useCallback((index: number) => {
        console.log('handleSheetChange', index);
        setOpenSheet(index === -1 ? false : true);
    }, [setOpenSheet])
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="w-full h-full">
            <GestureHandlerRootView style={{ flex: 1 }} className='w-full absolute'>
                <BottomSheet
                    index={0}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    ref={bottomSheetRef}
                    onChange={handleSheetChange}
                >
                    <BottomSheetView
                        style={{
                            paddingTop: 24,
                            paddingHorizontal: 20,
                            paddingBottom: 16,
                            backgroundColor: colorScheme === "dark" ? "#1e293b" : "#fff",
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            flex: 1,
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: colorScheme === "dark" ? "#f1f5f9" : "#1e293b",
                                    marginBottom: 8,
                                }}
                            >
                                Nama Produk
                            </Text>
                            {/* Input and Dropdown remain unchanged */}
                            {!isProductSelected ? (
                                <TextInput
                                    placeholder="Masukkan nama produk"
                                    value={produk}
                                    onChangeText={setProduk}
                                    style={{
                                        backgroundColor: "#cbd5e1",
                                        borderRadius: 10,
                                        paddingStart: 15,
                                        paddingEnd: 15,
                                        width: "100%",
                                        marginTop: 10,
                                        color: colorScheme === "dark" ? "white" : "black",
                                    }}
                                    placeholderTextColor={colorScheme === "dark" ? "white" : "gray"}
                                />
                            ) : (
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: colorScheme === "dark" ? "#334155" : "#f1f5f9",
                                        borderRadius: 10,
                                        paddingVertical: 14,
                                        paddingHorizontal: 16,
                                        marginTop: 10,
                                        borderWidth: 1.5,
                                        borderColor: "#6A74EF",
                                    }}
                                    onPress={() => setIsProductSelected(false)}
                                >
                                    <Text
                                        style={{
                                            color: "#6A74EF",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedProduct ? (selectedProduct.nama || selectedProduct.name) : produk}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            {/* Dropdown for product selection */}
                            {!isProductSelected && produk.trim() !== "" && (
                                <ScrollView
                                    style={{
                                        maxHeight: 120,
                                        marginTop: 8,
                                        borderRadius: 8,
                                        backgroundColor: colorScheme === "dark" ? "#334155" : "#f1f5f9",
                                        borderWidth: 1,
                                        borderColor: colorScheme === "dark" ? "#475569" : "#e5e7eb",
                                        shadowColor: "#000",
                                        shadowOpacity: 0.06,
                                        shadowRadius: 6,
                                        elevation: 2,
                                    }}
                                    keyboardShouldPersistTaps="handled"
                                >
                                    {filteredProducts.length === 0 && (
                                        <Text style={{ color: "#dc2626", padding: 12 }}>Tidak ditemukan</Text>
                                    )}
                                    {filteredProducts.map((p) => (
                                        <TouchableOpacity key={p.id} onPress={() => handleSelectProduct(p)}>
                                            <View
                                                style={{
                                                    paddingVertical: 10,
                                                    paddingHorizontal: 16,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: colorScheme === "dark" ? "#f1f5f9" : "#1e293b",
                                                        fontWeight: matchedProduct && matchedProduct.id === p.id ? "bold" : "normal",
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    {p.name}
                                                </Text>
                                                
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            )}
                        </View>

                        {/* Divider */}
                        <View
                            style={{
                                height: 1,
                                backgroundColor: colorScheme === "dark" ? "#334155" : "#e5e7eb",
                                marginVertical: 20,
                                borderRadius: 2,
                            }}
                        />

                        {/* Amount Row */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 16,
                                gap: 12,
                            }}
                        >
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ fontSize: 18, color: colorScheme === "dark" ? "#f1f5f9" : "#1e293b" }}>
                                    Jumlah
                                </Text>
                                <TextInput
                                    placeholder="1"
                                    style={{
                                        backgroundColor: "#cbd5e1",
                                        borderRadius: 10,
                                        width: 50,
                                        marginTop: 0,
                                        textAlign: "center",
                                        paddingEnd: 2,
                                        paddingStart: 2,
                                        marginLeft: 24,
                                        color: colorScheme === "dark" ? "#1e293b" : "#1e293b",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                    }}
                                    placeholderTextColor="#64748b"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                <Text style={{ fontSize: 18, color: colorScheme === "dark" ? "#f1f5f9" : "#1e293b" }}>x</Text>
                                <Text style={{ color: "#059669", fontSize: 18, fontWeight: "600" }}>
                                    Rp {selectedProduct
                                        ? useHargaSatuan
                                            ? (selectedProduct.harga_satuan ?? selectedProduct.harga ?? 0).toLocaleString()
                                            : (selectedProduct.harga ?? 0).toLocaleString()
                                        : "0"}
                                </Text>
                            </View>
                        </View>

                        {/* Harga Satuan Button */}
                        {selectedProduct && selectedProduct.harga_satuan !== undefined && selectedProduct.harga_satuan !== null && (
                            <TouchableOpacity
                                style={{
                                    width: 140,
                                    alignSelf: "flex-end",
                                    marginBottom: 24,
                                }}
                                onPress={() => setUseHargaSatuan(!useHargaSatuan)}
                                activeOpacity={0.85}
                            >
                                <View
                                    style={{
                                        borderWidth: 1.5,
                                        borderColor: colorScheme === "dark" ? "#cbd5e1" : "#6A74EF",
                                        backgroundColor: useHargaSatuan ? "#6A74EF" : "#fff",
                                        borderRadius: 999,
                                        paddingVertical: 10,
                                        paddingHorizontal: 8,
                                        shadowColor: "#6A74EF",
                                        shadowOpacity: useHargaSatuan ? 0.15 : 0,
                                        shadowRadius: 6,
                                        elevation: useHargaSatuan ? 2 : 0,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: useHargaSatuan ? "#fff" : "#2421A2",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            fontSize: 16,
                                        }}
                                    >
                                        Harga satuan
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}

                        {/* Tambah Button */}
                        <TouchableOpacity style={{ marginTop: "auto" }}>
                            <View
                                style={{
                                    backgroundColor: "#2421A2",
                                    borderRadius: 999,
                                    paddingVertical: 16,
                                    marginTop: 8,
                                    shadowColor: "#2421A2",
                                    shadowOpacity: 0.15,
                                    shadowRadius: 8,
                                    elevation: 2,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#fff",
                                        textAlign: "center",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    Tambah
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </BottomSheetView>
                </BottomSheet>
            </GestureHandlerRootView>
        </KeyboardAvoidingView>
    );
}
