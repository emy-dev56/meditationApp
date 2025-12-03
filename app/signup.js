import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";
import { useFormik } from 'formik';
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  userName: Yup.string()
    .min(3, "UserName must be at least 3 characters")
    .max(20, "UserName must be at most 20 characters")
    .required("UserName is required"),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });
  const router = useRouter();
  const handleRegister = async (values) => {
    const { userName, email, password } = values;
    const userDetails = { userName, email, password, token: "sample-token" };
    await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
    console.log("User logged in:", userDetails);

    router.push("/login");
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => <></>,
            headerTitle: "",
          }}
        />
        <View style={{ padding: 20 }} testID="signupContainer">
          <View
            style={{
              padding: 20,
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#f0f0f0",
              borderRadius: 50,
              height: 90,
              ...SHADOWS.medium,
              shadowColor: COLORS.white,
            }}
            testID="imageIcon">
            <Image
              source={icons.menu}
              style={{
                width: 50,
                height: 50,
              }}
            />
          </View>
          <View style={{ marginTop: 30 }} testID="formData">
            <View style={{ marginBottom: 10 }} testID="userName">
              <TextInput
                style={{
                  borderColor: "#ccc",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                onChangeText={formik.handleChange("userName")}
                onBlur={formik.handleBlur("userName")}
                value={formik.values.userName}
                placeholder="User Name"
              />
              {formik.touched.userName && formik.errors.userName ? (
                <Text style={styles.errorText}>{formik.errors.userName}</Text>
              ) : null}
            </View>
            <View style={{ marginBottom: 10 }} testID="email">
              <TextInput
                style={{
                  borderColor: "#ccc",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                value={formik.values.email}
                placeholder="Email"
              />
              {formik.touched.email && formik.errors.email ? (
                <Text style={styles.errorText}>{formik.errors.email}</Text>
              ) : null}
            </View>
            <View style={{ marginBottom: 10 }} testID="password">
              <TextInput
                style={{
                  borderColor: "#ccc",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                }}
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                value={formik.values.password}
                secureTextEntry={true}
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
              ) : null}
            </View>
            <View style={{ marginBottom: 20 }} testID="confirmpassword">
              <TextInput
                style={{
                  borderColor: "#ccc",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                }}
                onChangeText={formik.handleChange("confirmpassword")}
                onBlur={formik.handleBlur("confirmpassword")}
                value={formik.values.confirmpassword}
                secureTextEntry={true}
                placeholder="Confirm Password"
              />
              {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                <Text style={styles.errorText}>{formik.errors.confirmpassword}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                padding: 15,
                borderRadius: 5,
                alignItems: "center",
                marginBottom: 10,
              }}
              onPress={formik.handleSubmit}
              testID="handleRegister">
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
              testID="textData">
              <Text style={{ marginRight: 5 }}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={{ color: "blue" }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default SignUp;
