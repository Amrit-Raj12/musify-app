import {FC, ReactNode} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import CirlceUi from 'ui/CirlceUi';
import colors from 'utils/colors';

interface Props {
  heading?: string;
  subHeading?: string;
  children: ReactNode;
}

const AuthFormContainer: FC<Props> = ({heading, subHeading, children}) => {
  return (
    <View style={styles.container}>
      <CirlceUi position="top-left" size={200} />
      <CirlceUi position="top-right" size={100} />
      <CirlceUi position="bottom-left" size={100} />
      <CirlceUi position="bottom-right" size={200} />
      <View style={styles.headerContainer}>
        <Image source={require('../assets/logo.png')} />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  heading: {
    color: colors.SECONDARY,
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  subHeading: {color: colors.CONTRAST, fontSize: 16},
  headerContainer: {width: '100%', marginBottom: 20},
});

export default AuthFormContainer;
