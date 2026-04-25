import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
  <Drawer>
    <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'overview',
        }}
      />
    <Drawer.Screen
      name="all-drugs/index"
      options={{
        drawerLabel: 'Remedios',
        title: 'Remédios',
      }}
    />
    <Drawer.Screen
      name="remove-drugs/index"
      options={{
        drawerLabel: 'Remover Remédio',
        title: 'Remover Remédio',
      }}
    />
    <Drawer.Screen
        name="add-drugs/index"
        options={{
          drawerLabel: 'Remédio',
          title: 'overview',
        }}
      />
  </Drawer>
  )
}
