import { View, Image, TextInput } from "react-native"

const share = require("@/assets/images/share.png")

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={share}
        className="w-60 h-60"
        alt="Logo"
      />
      <TextInput />
    </View>
  );
}
