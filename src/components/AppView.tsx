import {FC, ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import MiniAudioPlayer from './MiniAudioPlayer';
import useAudioController from 'hooks/useAudioController';
import PlaylistAudioModal from './PlaylistAudioModal';

interface Props {
  children: ReactNode;
}

const AppView: FC<Props> = ({children}) => {
  const {isPlayerReady} = useAudioController();
  // console.log(isPlayerReady);
  return (
    <View style={styles.container}>
      <View style={styles.children}>{children}</View>
      {isPlayerReady ? <MiniAudioPlayer /> : null}
      <PlaylistAudioModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  children: {
    flex: 1,
  },
});

export default AppView;
