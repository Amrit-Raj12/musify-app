import {FC} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import colors from 'utils/colors';
import PlayAnimation from './PlayAnimation';
import Loader from './Loader';
import useAudioController from 'hooks/useAudioController';

interface Props {
  title: string;
  poster?: string;
  playing?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?(): void;
  onLongPress?(): void;
  isBusy?: boolean;
}

const AudioCard: FC<Props> = ({
  title,
  playing = false,
  poster,
  containerStyle,
  onPress,
  onLongPress,
  isBusy,
}) => {
  const source = poster ? {uri: poster} : require('../assets/music.png');

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container, containerStyle]}>
      <View style={styles.posterContainer}>
        <Image source={source} style={styles.poster} />
        {isBusy ? (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.OVERLAY,
            }}>
            <Loader />
          </View>
        ) : (
          <PlayAnimation visible={playing} />
        )}
      </View>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: 15,
  },
  posterContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 7,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
});

export default AudioCard;
