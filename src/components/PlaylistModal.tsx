import {FC, ReactNode} from 'react';
import {View, StyleSheet, Pressable, Text, ScrollView} from 'react-native';
import BasicModalContainer from 'ui/BasicModalContainer';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'utils/colors';
import {Playlist} from 'types/audio';

interface Props {
  visible: boolean;
  onRequestClose(): void;
  list: Playlist[];
  onCreateNewPress(): void;
  onPlaylistPress(item: Playlist): void;
}

interface ListItemProps {
  title: string;
  icon: ReactNode;
  onPress?(): void;
}

const ListItem: FC<ListItemProps> = ({title, icon, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.listItemContainer}>
      {icon}
      <Text style={styles.listItemTitle}>{title}</Text>
    </Pressable>
  );
};

const PlaylistModal: FC<Props> = ({
  visible,
  onRequestClose,
  list,
  onCreateNewPress,
  onPlaylistPress,
}) => {
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      <ScrollView>
        {list.map(item => {
          return (
            <ListItem
              onPress={() => onPlaylistPress(item)}
              key={item.id}
              icon={
                <FontAwesomeIcon
                  name={item.visibility === 'public' ? 'globe' : 'lock'}
                  size={20}
                  style={{color: colors.PRIMARY}}
                />
              }
              title={item.title}
            />
          );
        })}
      </ScrollView>
      <ListItem
        icon={
          <AntDesign name="plus" size={20} style={{color: colors.PRIMARY}} />
        }
        title="Create New"
        onPress={onCreateNewPress}
      />
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  listItemContainer: {flexDirection: 'row', alignItems: 'center', height: 45},
  listItemTitle: {fontSize: 16, color: colors.PRIMARY},
});

export default PlaylistModal;
