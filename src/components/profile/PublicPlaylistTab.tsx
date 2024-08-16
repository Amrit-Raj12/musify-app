import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FC} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {PublicProfileTabParamsList} from 'src/types/navigation';
import {useFetchPublicPlaylist} from 'src/hooks/query';
import PlaylisItem from 'ui/PlaylisItem';
import {useDispatch} from 'react-redux';
import {Playlist} from 'types/audio';
import {
  updatePlaylistVisibility,
  updateSelectedList,
} from 'store/playlistModal';

type Props = NativeStackScreenProps<
  PublicProfileTabParamsList,
  'PublicPlaylist'
>;

const PublicPlaylistTab: FC<Props> = props => {
  const {data} = useFetchPublicPlaylist(props.route.params.profileId);

  const dispatch = useDispatch();

  const handleOnListPress = (playlist: Playlist) => {
    dispatch(updateSelectedList(playlist.id));
    dispatch(updatePlaylistVisibility(true));
  };

  return (
    <ScrollView style={styles.container}>
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

export default PublicPlaylistTab;
