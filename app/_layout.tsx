import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
  <Drawer>
    <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Home',
          title: 'overview',
        }}
      />
    <Drawer.Screen
      name="all-drugs/index" // This is the name of the page and must match the url from root
      options={{
        drawerLabel: 'Remedios',
        title: 'Remédios',
      }}
    />
    <Drawer.Screen
        name="add-drugs/index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Remédio',
          title: 'overview',
        }}
      />
  </Drawer>
  )
}
