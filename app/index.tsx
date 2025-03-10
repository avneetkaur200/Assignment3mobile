import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Welcome to My App
      </Text>
      <Link href="/callAPI" asChild>
        <Text style={{ fontSize: 18, color: "blue" }}>GO TO APP</Text>
        </Link>

    </View>
  );
}
