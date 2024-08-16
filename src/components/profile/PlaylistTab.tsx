import {useFetchPlaylist} from 'hooks/query';
import {FC} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  updatePlaylistVisibility,
  updateSelectedList,
} from 'store/playlistModal';
import {Playlist} from 'types/audio';
import EmptyRecors from 'ui/EmptyRecors';
import PlaylisItem from 'ui/PlaylisItem';

interface Props {}

const PlaylistTab: FC<Props> = props => {
  const {data, isLoading} = useFetchPlaylist();

  const dispatch = useDispatch();

  const handleOnListPress = (playlist: Playlist) => {
    dispatch(updateSelectedList(playlist.id));
    dispatch(updatePlaylistVisibility(true));
  };
  return (
    <ScrollView style={styles.container}>
      {!data?.length ? <EmptyRecors title="There is no  playlist !" /> : null}
      {data?.map(playlist => {
        return (
          <PlaylisItem
            onPress={() => handleOnListPress(playlist)}
            key={playlist.id}
            playlist={playlist}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlaylistTab;
