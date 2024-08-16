import {useFetchPlaylistAudios} from 'hooks/query';
import useAudioController from 'hooks/useAudioController';
import {FC} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getPlayerState} from 'store/player';
import {
  getPlaylistModalState,
  updatePlaylistVisibility,
} from 'store/playlistModal';
import AppModal from 'ui/AppModal';
import AudioListItem from 'ui/AudioListItem';
import AudioListLoadingUI from 'ui/AudioListLoadingUI';
import colors from 'utils/colors';

interface Props {}

const PlaylistAudioModal: FC<Props> = props => {
  const {visible, selectedListId} = useSelector(getPlaylistModalState);

  const {onAudioPress} = useAudioController();

  const {onGoingAudio} = useSelector(getPlayerState);

  const {data, isLoading} = useFetchPlaylistAudios(selectedListId || '');

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(updatePlaylistVisibility(false));
  };

  return (
    <AppModal visible={visible} onRequestClose={handleClose}>
      <View style={styles.container}>
        {isLoading ? (
          <AudioListLoadingUI />
        ) : (
          <>
            <Text style={styles.title}>{data?.title}</Text>
            <FlatList
              contentContainerStyle={styles.flatlist}
              data={data?.audios}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <AudioListItem
                    onPress={() => onAudioPress(item, data?.audios || [])}
                    isPlaying={onGoingAudio?.id === item.id}
                    audio={item}
                  />
                );
              }}
            />
          </>
        )}
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flatlist: {
    paddingBottom: 50,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
});

export default PlaylistAudioModal;
