import GridView from '@ui/GridView';
import colors from '@utils/colors';
import useAudioController from 'hooks/useAudioController';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {useFetchRecommendedAudios} from 'src/hooks/query';
import {getPlayerState} from 'store/player';
import {AudioData} from 'types/audio';
import AudioCard from 'ui/AudioCard';
import PulseAnimationContainer from 'ui/PulseAnimationContainer';

interface Props {
  onAudioPress(item: AudioData, data: AudioData[]): void;
  onAudioLongPress(item: AudioData, data: AudioData[]): void;
}

const dummyData = new Array(6).fill('');

const RecommendedAudios: FC<Props> = ({onAudioPress, onAudioLongPress}) => {
  const {data = [], isLoading} = useFetchRecommendedAudios();
  const {onGoingAudio} = useSelector(getPlayerState);
  const {isBusy} = useAudioController();

  if (isLoading)
    return (
      <PulseAnimationContainer>
        <View>
          <View style={styles.dummyTitleView} />
          <GridView
            col={3}
            data={dummyData}
            renderItem={item => {
              return <View style={styles.dummyAudioView} />;
            }}
          />
        </View>
      </PulseAnimationContainer>
    );

  if (!data?.length) return null;

  return (
    <View>
      <Text style={styles.title}>You may like this</Text>
      <GridView
        col={3}
        data={data || []}
        renderItem={item => {
          return (
            <AudioCard
              title={item.title}
              poster={item.poster}
              onPress={() => onAudioPress(item, data)}
              onLongPress={() => onAudioLongPress(item, data)}
              containerStyle={{width: '100%'}}
              playing={onGoingAudio?.id === item.id}
              isBusy={item.id === onGoingAudio?.id && isBusy}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  audioTitle: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  poster: {width: '100%', aspectRatio: 1, borderRadius: 7},
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginBottom: 15,
    borderRadius: 5,
  },
  dummyAudioView: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.INACTIVE_CONTRAST,
    borderRadius: 5,
  },
});

export default RecommendedAudios;
