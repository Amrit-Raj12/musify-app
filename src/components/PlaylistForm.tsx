import {FC, useState} from 'react';
import {View, StyleSheet, TextInput, Pressable, Text} from 'react-native';
import BasicModalContainer from 'ui/BasicModalContainer';
import colors from 'utils/colors';
import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface PlaylistInfo {
  title: string;
  private: boolean;
}

interface Props {
  visible: boolean;
  onRequestClose(): void;
  onSubmit(value: PlaylistInfo): void;
}

const PlaylistForm: FC<Props> = ({onRequestClose, visible, onSubmit}) => {
  const [playlistInfo, setPlaylistInfo] = useState({
    title: '',
    private: false,
  });

  const handleSubmit = () => {
    onSubmit(playlistInfo);
    handleClose();
  };

  const handleClose = () => {
    setPlaylistInfo({title: '', private: false});
    onRequestClose();
  };

  return (
    <BasicModalContainer visible={visible} onRequestClose={handleClose}>
      <View>
        <Text style={styles.title}>Crearte New Playlist</Text>
        <TextInput
          onChangeText={text => {
            setPlaylistInfo({...playlistInfo, title: text});
          }}
          placeholder="Title"
          style={styles.input}
          value={playlistInfo.title}
        />
        <Pressable
          onPress={() => {
            setPlaylistInfo({...playlistInfo, private: !playlistInfo.private});
          }}
          style={styles.privateSelector}>
          {playlistInfo.private ? (
            <MaterialComunityIcon
              name="radiobox-marked"
              color={colors.PRIMARY}
            />
          ) : (
            <MaterialComunityIcon
              name="radiobox-blank"
              color={colors.PRIMARY}
            />
          )}
          <Text style={styles.privateLabel}>Private</Text>
        </Pressable>
        <Pressable onPress={handleSubmit} style={styles.submitButn}>
          <Text style={styles.privateLabel}>Create</Text>
        </Pressable>
      </View>
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: colors.PRIMARY,
    fontWeight: '700',
  },
  input: {
    height: 45,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    color: colors.PRIMARY,
  },
  privateSelector: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
  },
  privateLabel: {
    color: colors.PRIMARY,
    marginLeft: 5,
  },
  submitButn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    borderRadius: 7,
  },
});

export default PlaylistForm;
