# @volkenomakers/react-native-tabs

## Add it to your project

- Using NPM
  `npm install @volkenomakers/react-native-tabs`
- or:
- Using Yarn
  `yarn add @volkenomakers/react-native-tabs`

- Install react-native-pager-view
  `yarn add react-native-pager-view`

## Usage

```javascript
import React from "react";
import { Text, View } from "react-native";
import Tabs from "@volkenomakers/react-native-tabs";

const App = () => {
  return (
    <View style={{ flex: 1, paddingVertical: 40, paddingHorizontal: 15 }}>
      <Tabs
        activeTitleStyle={{ color: "#F00" }}
        items={["Tab1", "Tab2", "Tab3"]}
        initTab={1}
        onTabChange={(tab) => console.log({ tab })}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Tab1</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Tab2</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Tab3</Text>
        </View>
      </Tabs>
    </View>
  );
};

export default App;
```

**ISC Licensed**
