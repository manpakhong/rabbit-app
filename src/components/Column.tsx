import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import appStyles from "../styles/appStylesVertical";

type Props = {
  children: React.ReactNode;
};

export default function Column({ children }: Props) {
  return <View style={appStyles.column}>{children}</View>;
}

Column.propTypes = {
  children: PropTypes.node.isRequired,
};