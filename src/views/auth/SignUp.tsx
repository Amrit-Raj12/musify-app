import AuthInputField from 'components/form/AuthInputField';
import Form from 'components/form';
import {FC, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  Image,
  Text,
} from 'react-native';
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
import {isAxiosError} from 'axios';
import catchAsyncError from 'api/catchError';
import {useDispatch} from 'react-redux';
import {updateNotification} from 'store/notification';

const signUpSchema = yup.object({
  name: yup
    .string()
    .trim('Name is missing!')
    .min(3, 'Invalid Name!')
    .required('Name is required!'),
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid Email!')
    .required('Email is required!'),
  password: yup
    .string()
    .trim('Password is missing!')
    .min(8, 'Password is too short!')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'Password is too simple!',
    )
    .required('Password is required!'),
});

interface Props {}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const dispatch = useDispatch();

  const togglePasswordView = () => setSecureEntry(!secureEntry);

  const handleSubmit = async (
    values: NewUser,
    actions: FormikHelpers<NewUser>,
  ) => {
    actions.setSubmitting(true);
    try {
      const {data} = await client.post('/auth/create', {
        ...values,
      });
      navigation.navigate('Verification', {userInfo: data.user});
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    actions.setSubmitting(false);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signUpSchema}>
      <AuthFormContainer
        heading="Welcome!"
        subHeading="Let's get started by creating your account.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            placeholder="Enter Your Name"
            label="Name"
            containerStyles={styles.marginBottom}
          />
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
          <SubmitBtn title="Sign Up" />
          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => {
                navigation.navigate('LostPassword');
              }}
            />
            <AppLink
              title="Sign In"
              onPress={() => {
                navigation.navigate('SignIn');
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

export default SignUp;
