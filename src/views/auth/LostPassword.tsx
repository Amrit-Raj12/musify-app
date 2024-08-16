import AuthInputField from 'components/form/AuthInputField';
import Form from 'components/form';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'utils/colors';
import * as yup from 'yup';
import SubmitBtn from 'components/form/SubmitBtn';
import AppLink from 'ui/AppLink';
import AuthFormContainer from 'components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'types/navigation';
import {FormikHelpers} from 'formik';
import client from 'api/client';
import catchAsyncError from 'api/catchError';
import {updateNotification} from 'store/notification';
import {useDispatch} from 'react-redux';

const lostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing!')
    .email('Invalid Email!')
    .required('Email is required!'),
});

interface Props {}

interface InitialValues {
  email: string;
}

const initialValues = {
  email: '',
};

const LostPassword: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const dispatch = useDispatch();

  const handleSubmit = async (
    values: InitialValues,
    actions: FormikHelpers<InitialValues>,
  ) => {
    actions.setSubmitting(true);
    try {
      const {data} = await client.post('/auth/forget-password', {
        ...values,
      });
      // navigation.navigate('Verification', {userInfo: data.user});
      console.log(data);
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
      validationSchema={lostPasswordSchema}>
      <AuthFormContainer
        heading="Forget Password!"
        subHeading="Oops, did you forget your passwod? Don't worry, we'll help you get back in.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="amrit@gmail.com"
            label="Email"
            containerStyles={styles.marginBottom}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <SubmitBtn title="Send Link" />
          <View style={styles.linkContainer}>
            <AppLink
              title="Sign In"
              onPress={() => {
                navigation.navigate('SignIn');
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

export default LostPassword;
