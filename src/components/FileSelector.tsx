import {FC, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  StyleProp,
  ViewStyle,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'utils/colors';
import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {SupportedPlatforms} from 'react-native-document-picker/lib/typescript/fileTypes';

interface Props {
  icon?: ReactNode;
  btnTitle?: string;
  style?: StyleProp<ViewStyle>;
  onSelect(file: DocumentPickerResponse): void;
  options: DocumentPickerOptions<SupportedPlatforms>;
}

const requestDocumentPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Required',
          message:
            'This app needs access to your documents to function properly.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Document permission granted');
      } else {
        console.log('Document permission denied');
      }
    } else {
      // For iOS, you usually request permissions statically in the Info.plist file
      console.log('Document permission granted for iOS');
    }
  } catch (error) {
    console.error('Error requesting document permission:', error);
  }
};

const FileSelector: FC<Props> = ({
  icon,
  onSelect,
  options,
  btnTitle,
  style,
}) => {
  const handleDocumentSelect = async () => {
    // requestDocumentPermission();
    try {
      const document = await DocumentPicker.pick(options);
      const file = document[0];
      onSelect(file);
      // [{"fileCopyUri": null, "name": "", "size": , "type": "", "uri": ""}]
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log('Error in Document Picker: ', error);
      }
    }
  };

  return (
    <Pressable
      onPress={handleDocumentSelect}
      style={[styles.btnContainer, style]}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.btnTitle}>{btnTitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    color: colors.CONTRAST,
    marginTop: 5,
  },
});

export default FileSelector;
