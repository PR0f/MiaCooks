import { StyleProp, ViewStyle } from "react-native";

interface Tab {
    title: any;
    pageNo: number;
    onPress?: Function;
  }
  
  
  export interface ProgressiveBarProps {
    page: number;
    setPage?: Function;
    tabs: Tab[];

    titleProps?: object;
    style?: StyleProp<ViewStyle> | undefined;
  }