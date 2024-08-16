import LatestUploads from '@components/LatestUpload';
import OptionsModal from '@components/OptionsModal';
import RecommendedAudios from '@components/RecommendedAudios';
import colors from '@utils/colors';
import catchAsyncError from 'api/catchError';
import {getClient} from 'api/client';
import AppView from 'components/AppView';
import PlaylistForm, {PlaylistInfo} from 'components/PlaylistForm';
import PlaylistModal from 'components/PlaylistModal';
import RecentlyPlayed from 'components/RecentlyPlayed';
import RecommendedPlaylist from 'components/RecommendedPlaylist';
import {useFetchPlaylist} from 'hooks/query';
import useAudioController from 'hooks/useAudioController';
import {FC, useEffect, useState} from 'react';
import {StyleSheet, Pressable, Text, ScrollView, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {updateNotification} from 'store/notification';
import {
  updatePlaylistVisibility,
  updateSelectedList,
} from 'store/playlistModal';
import {AudioData, Playlist} from 'types/audio';

interface Props {}

const Home: FC<Props> = props => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioData>();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const {onAudioPress} = useAudioController();

  const {data} = useFetchPlaylist();

  const dispatch = useDispatch();

  const handleOnFavPress = async () => {
    try {
      const client = await getClient();

      if (!selectedAudio) return;
      const {data} = await client.post('/favorite?audioId=' + selectedAudio.id);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    setSelectedAudio(undefined);
    setShowOptions(false);
  };

  const handleOnLongPress = (audio: AudioData) => {
    setSelectedAudio(audio);
    setShowOptions(true);
  };
  const handleOnAddToPlaylist = () => {
    setShowOptions(false);
    setShowPlaylistModal(true);
  };

  const updatePlaylist = async (item: Playlist) => {
    try {
      const client = await getClient();
      const {data} = await client.patch('/playlist', {
        id: item.id,
        item: selectedAudio?.id,
        title: item.title,
        visibility: item.visibility,
      });

      setSelectedAudio(undefined);
      setShowPlaylistModal(false);
      dispatch(
        updateNotification({message: 'New audio added', type: 'success'}),
      );
    } catch (error) {
      const ErrorMessage = catchAsyncError(error);
      console.log(ErrorMessage);
    }
  };

  const handlePlaylistSubmit = async (value: PlaylistInfo) => {
    if (!value.title.trim()) return;
    try {
      const client = await getClient();
      const {data} = await client.post('/playlist/create', {
        resId: selectedAudio?.id,
        title: value.title,
        visibility: value.private ? 'private' : 'public',
      });
      console.log(data);
    } catch (error) {
      const ErrorMessage = catchAsyncError(error);
      console.log(ErrorMessage);
    }
  };

  const handleOnListPress = (playlist: Playlist) => {
    dispatch(updateSelectedList(playlist.id));
    dispatch(updatePlaylistVisibility(true));
  };

  return (
    <AppView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.space}>
          <RecentlyPlayed />
        </View>
        <View style={styles.space}>
          <LatestUploads
            onAudioPress={onAudioPress}
            onAudioLongPress={handleOnLongPress}
          />
        </View>

        <View style={styles.space}>
          <RecommendedAudios
            onAudioPress={onAudioPress}
            onAudioLongPress={handleOnLongPress}
          />
        </View>
        <View style={styles.space}>
          <RecommendedPlaylist onListPress={handleOnListPress} />
        </View>
        <OptionsModal
          visible={showOptions}
          onRequestClose={() => {
            setShowOptions(false);
          }}
          options={[
            {
              title: 'Add to playlist',
              icon: 'playlist-music',
              onPress: handleOnAddToPlaylist,
            },
            {
              title: 'Add to favorite',
              icon: 'cards-heart',
              onPress: handleOnFavPress,
            },
          ]}
          renderItem={item => {
            return (
              <Pressable onPress={item.onPress} style={styles.optionContainer}>
                <MaterialComIcon
                  size={24}
                  color={colors.PRIMARY}
                  name={item.icon}
                />
                <Text style={styles.optionLabel}>{item.title}</Text>
              </Pressable>
            );
          }}
        />
        <PlaylistModal
          visible={showPlaylistModal}
          onRequestClose={() => {
            setShowPlaylistModal(false);
          }}
          list={data || []}
          onCreateNewPress={() => {
            setShowPlaylistModal(false);
            setShowPlaylistForm(true);
          }}
          onPlaylistPress={updatePlaylist}
        />
        <PlaylistForm
          visible={showPlaylistForm}
          onRequestClose={() => {
            setShowPlaylistForm(false);
          }}
          onSubmit={handlePlaylistSubmit}
        />
      </ScrollView>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  space: {
    marginBottom: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
});

export default Home;
