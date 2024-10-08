import {NavigationProp, useNavigation} from '@react-navigation/native';
import OptionsModal from 'components/OptionsModal';
import {useFetchUploadsByProfile} from 'hooks/query';
import useAudioController from 'hooks/useAudioController';
import {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getPlayerState} from 'store/player';
import {AudioData} from 'types/audio';
import {ProfileNavigatorStackParamList} from 'types/navigation';
import AudioListItem from 'ui/AudioListItem';
import AudioListLoadingUI from 'ui/AudioListLoadingUI';
import EmptyRecors from 'ui/EmptyRecors';
import colors from 'utils/colors';
import AntDesing from 'react-native-vector-icons/AntDesign';

interface Props {}

const UploadsTab: FC<Props> = props => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioData>();
  const {onGoingAudio} = useSelector(getPlayerState);
  const {data, isLoading} = useFetchUploadsByProfile();
  const {onAudioPress} = useAudioController();
  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  const handleOnLongPress = (audio: AudioData) => {
    setSelectedAudio(audio);
    setShowOptions(true);
  };

  const handleOnEditPress = () => {
    setShowOptions(false);
    if (selectedAudio)
      navigate('UpdateAudio', {
        audio: selectedAudio,
      });
  };

  if (isLoading) return <AudioListLoadingUI />;

  if (!data?.length) return <EmptyRecors title="There is no audio!" />;

  return (
    <>
      <ScrollView style={styles.container}>
        {data?.map(item => {
          return (
            <AudioListItem
              onPress={() => onAudioPress(item, data)}
              key={item.id}
              audio={item}
              isPlaying={onGoingAudio?.id === item.id}
              onLongPress={() => handleOnLongPress(item)}
            />
          );
        })}
      </ScrollView>
      <OptionsModal
        visible={showOptions}
        onRequestClose={() => {
          setShowOptions(false);
        }}
        options={[
          {
            title: 'Edit',
            icon: 'edit',
            onPress: handleOnEditPress,
          },
        ]}
        renderItem={item => {
          return (
            <Pressable onPress={item.onPress} style={styles.optionContainer}>
              <AntDesing size={24} color={colors.PRIMARY} name={item.icon} />
              <Text style={styles.optionLabel}>{item.title}</Text>
            </Pressable>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
});

export default UploadsTab;
