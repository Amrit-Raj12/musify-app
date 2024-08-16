import useAudioController from 'hooks/useAudioController';
import {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getPlayerState} from 'store/player';
import AudioListModal from 'ui/AudioListModal';

interface Props {
  visible: boolean;
  onRequestClose(): void;
}

const CurrentAudioList: FC<Props> = ({visible, onRequestClose}) => {
  const {onGoingList, onGoingAudio} = useSelector(getPlayerState);
  const {onAudioPress} = useAudioController();
  return (
    <AudioListModal
      header="Audios on the way"
      visible={visible}
      onRequestClose={onRequestClose}
      data={onGoingList}
      onItemPress={onAudioPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CurrentAudioList;
