import React from "react";
import { Text, TextProps } from "react-native";

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({ style, ...props }) => {
  return <Text style={[{ fontFamily: "Inter-Regular" }, style]} {...props} />;
};

export default CustomText;
