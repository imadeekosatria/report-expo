import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, useColorScheme, View } from 'react-native';


type Props = {
    setOpenSheet: (value: boolean) => void;
}

export const BottomSheetSetoran = ({setOpenSheet}: Props)=>{
    const colorScheme = useColorScheme();
    const snapPoints = useMemo(() => ['50%', '70'], []);
    const bottomSheetRef = useRef<BottomSheet>(null)
    const [pressed, setPressed] = useState<boolean>(false);


    const handleSheetChange = useCallback((index: number)=>{
        console.log('handleSheetChange', index);
        setOpenSheet(index === -1 ? false : true);
    },[setOpenSheet])
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
                    <BottomSheetView style={{paddingTop: 20, paddingLeft:20, paddingRight:20}} className='flex h-full'>
                        <Text className='text-xl'>Nama Produk</Text>
                        <TextInput placeholder='Masukkan nama produk' style={{
                            backgroundColor:'#cbd5e1',
                            borderRadius: 10,
                            paddingStart: 15,
                            paddingEnd: 15,
                            width: '100%',
                            marginTop: 10,
                            color: colorScheme === 'dark' ? 'white' : 'black',
                            }} 
                            placeholderTextColor={colorScheme === 'dark'? 'white' : 'gray'} 
                            />
                        <View className='flex-row w-full items-center mt-4'>
                            <View className='flex-row items-center flex-1'>
                                <Text className='text-xl'>Jumlah</Text>
                                <TextInput placeholder='1' style={{
                                    backgroundColor:'#cbd5e1',
                                    borderRadius: 10,
                                    width: 50,
                                    marginTop: 10,
                                    textAlign: 'center',
                                    paddingEnd: 2,
                                    paddingStart: 2,
                                    marginLeft: 40,
                                }}/>
                            </View>
                            <View className='flex-row items-center justify-between'>
                                <Text className='text-xl'>x</Text><Text className='text-emerald-600 text-xl font-medium'> Rp 50.000</Text>
                            </View>
                        </View>
                        <TouchableOpacity className='mt-4' style={{width: 120, marginLeft: 'auto'}} onPress={()=> setPressed(!pressed)}>
                            <View className='rounded-full' style={{
                                borderWidth: 1.5,
                                borderColor: colorScheme === 'dark' ? '#cbd5e1' : '#6A74EF',
                                backgroundColor: pressed===true?'#6A74EF':'white',
                                padding: 10
                            }}>
                                <Text style={{color: pressed===true? 'white':'#2421A2', fontWeight: 700, textAlign:'center'}} className=''>Harga satuan</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='mt-auto'>
                            <View className='bg-[#2421A2] rounded-full p-4 mt-4'>
                                <Text className='text-white text-center text-xl font-medium'>Tambah</Text>
                            </View>
                        </TouchableOpacity>
                    </BottomSheetView>
                </BottomSheet>
            </GestureHandlerRootView>
        </KeyboardAvoidingView>
    );
}
