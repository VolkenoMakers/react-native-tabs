import React, { ReactElement, useRef } from "react";

import {
  Animated,
  Dimensions,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
const DIMENSIONS = Dimensions.get("window");
function Tabs({
  children,
  items,
  tabsBackgroundColor = "#FFF",
  indicatorColor = "#498494",
  titleStyle,
  activeTitleStyle,
  initTab = 0,
  onTabChange,
}: {
  children: Array<ReactElement>;
  items: string[];
  tabsBackgroundColor?: string;
  indicatorColor?: string;
  titleStyle?: TextStyle;
  activeTitleStyle?: TextStyle;
  initTab?: number;
  onTabChange?: (currentTab: number) => void;
}) {
  const ref = useRef<PagerView>(null);
  const { width } = DIMENSIONS;
  const indicatorWidth = width / items.length;
  const index = React.useRef(new Animated.Value(0)).current;
  const animation = React.useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: index,
      useNativeDriver: false,
    }).start();
  }, []);

  const indicatorX =
    items.length > 1
      ? animation.interpolate({
          inputRange: items.map((_, i) => i),
          outputRange: items.map((_, i) => i * indicatorWidth),
          extrapolate: "clamp",
        })
      : 0;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 10,
          backgroundColor: tabsBackgroundColor,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: width,
            justifyContent: "space-between",
          }}
        >
          <Animated.View
            style={{
              transform: [{ translateX: indicatorX }],
              width: indicatorWidth,
              height: 2,
              bottom: -8,
              borderRadius: 15,
              position: "absolute",

              alignItems:
                currentIndex === 0
                  ? "flex-start"
                  : currentIndex === 1
                  ? "center"
                  : "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: indicatorColor,
                height: 2,
                width: indicatorWidth,
              }}
            >
              <Text />
            </View>
          </Animated.View>

          {items.map((i, ind: number) => {
            const color = animation.interpolate({
              inputRange: [ind - 1, ind, ind + 1],
              extrapolate: "clamp",
              outputRange: ["#757F8C", "#000", "#757F8C"],
            });
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setCurrentIndex(ind);
                  onTabChange?.(ind);
                  index.setValue(ind);
                  if (ref.current) {
                    ref.current?.setPage(ind);
                  }
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    width: indicatorWidth,
                  }}
                >
                  <Animated.Text
                    style={[
                      {
                        fontSize: 14,
                        color,
                        fontWeight: "bold",
                        textAlign: "center",
                      },
                      ind === currentIndex ? activeTitleStyle : titleStyle,
                    ]}
                  >
                    {i}
                  </Animated.Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <PagerView
        initialPage={initTab}
        ref={ref}
        onPageSelected={(page) => {
          setCurrentIndex(page.nativeEvent.position);
          onTabChange?.(page.nativeEvent.position);
          index.setValue(page.nativeEvent.position);
        }}
        style={{ flex: 1 }}
      >
        {children.map((child, index) => (
          <View key={index} style={{ flex: 1 }}>
            {child}
          </View>
        ))}
      </PagerView>
    </View>
  );
}

export default Tabs;
