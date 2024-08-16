import AuthInputField from 'components/form/AuthInputField';
import Form from 'components/form';
import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'utils/colors';
import * as yup from 'yup';
import SubmitBtn from 'components/form/SubmitBtn';
import PasswordVisiblity from 'ui/PasswordVisiblity';
import AppLink from 'ui/AppLink';
import AuthFormContainer from 'components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'types/navigation';
import {FormikHelpers} from 'formik';
import client from 'api/client';
import {updateLoggedInState, updateProfile} from 'store/auth';
import {useDispatch} from 'react-redux';
import {Keys, clearAsyncStorage, saveToAsyncStorage} from 'utils/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import catchAsyncError from 'api/catchError';
import {updateNotification} from 'store/notification';

const signInSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid Email!')
    .required('Email is required!'),
  password: yup
    .string()
    .trim('Password is missing!')
    .min(8, 'Password is too short!')
    .required('Password is required!'),
});

interface Props {}

interface SignInUserInfo {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

const SignIn: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();

  const togglePasswordView = () => setSecureEntry(!secureEntry);

  const handleSubmit = async (
    values: SignInUserInfo,
    actions: FormikHelpers<SignInUserInfo>,
  ) => {
    actions.setSubmitting(true);
    try {
      const {data} = await client.post('/auth/sign-in', {
        ...values,
      });
      console.log(data);
      await saveToAsyncStorage(Keys.AUTH_TOKEN, data.token);
      dispatch(updateProfile(data.profile));
      dispatch(updateLoggedInState(true));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    actions.setSubmitting(false);
  };

  // clearAsyncStorage();

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signInSchema}>
      <AuthFormContainer heading="Welcome back!">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="Enter Your Email"
            label="Email"
            containerStyles={styles.marginBottom}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AuthInputField
            name="password"
            placeholder="********"
            label="Password"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            containerStyles={styles.marginBottom}
            rightIcon={<PasswordVisiblity privateIcon={secureEntry} />}
            onRightIconPress={togglePasswordView}
          />
          <SubmitBtn title="Sign In" />
          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => {
                navigation.navigate('LostPassword');
              }}
            />
            <AppLink
              title="Sign Up"
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 25,
    color: colors.CONTRAST,
    padding: 10,
  },
  label: {
    color: colors.CONTRAST,
  },
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default SignIn;
