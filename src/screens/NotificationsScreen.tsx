import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Bell, WarningCircle, Clock, TrendUp, CheckCircle } from 'phosphor-react-native';
import ScreenHeader from '../components/ScreenHeader';
import { color, tint } from '../theme/tokens';
import { type } from '../theme/typography';
import { useAppState } from '../domain/state/AppStateContext';
import type { AppNotification } from '../domain/types';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const ICON_BY_ID: Record<string, typeof Bell> = {
  'notif-nisab': CheckCircle,
  'notif-haul': Clock,
  'notif-bnkx': WarningCircle,
  'notif-bunga': WarningCircle,
  'notif-haji': TrendUp,
};

export default function NotificationsScreen() {
  const navigation = useNavigation<Nav>();
  const { notifications, markAllNotificationsRead } = useAppState();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.bg }}>
      <ScreenHeader
        title="Notifikasi"
        onBack={() => navigation.goBack()}
        trailing={
          <Pressable onPress={markAllNotificationsRead} hitSlop={8}>
            <Text style={{ fontFamily: type.secondary.fontFamily, fontSize: 12.5, color: color.accentLight }}>
              Tandai dibaca
            </Text>
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 32, gap: 10 }}>
        {notifications.map((n) => (
          <NotificationCard key={n.id} notification={n} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function NotificationCard({
  notification,
  navigation,
}: {
  notification: AppNotification;
  navigation: Nav;
}) {
  const Icon = ICON_BY_ID[notification.id] ?? Bell;
  return (
    <Pressable
      onPress={() =>
        (navigation.navigate as (screen: string, params?: object) => void)(
          notification.deepLink.screen,
          notification.deepLink.params
        )
      }
      style={{
        flexDirection: 'row',
        gap: 12,
        padding: 14,
        borderRadius: 8,
        backgroundColor: color.surface,
        borderLeftWidth: notification.unread ? 2 : 0,
        borderLeftColor: color.accent,
      }}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: notification.unread ? tint('accent', 0.16) : color.surfaceHover,
        }}
      >
        <Icon size={17} color={notification.unread ? color.accent : color.textFaint} weight="regular" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: type.rowLabel.fontFamily, fontSize: 14, color: color.text }}>
          {notification.title}
        </Text>
        <Text style={{ fontFamily: type.body.fontFamily, fontSize: 12, lineHeight: 17, color: color.textDim, marginTop: 4 }}>
          {notification.body}
        </Text>
        <Text style={[type.timestamp, { marginTop: 6 }]}>{notification.timeLabel}</Text>
      </View>
    </Pressable>
  );
}
