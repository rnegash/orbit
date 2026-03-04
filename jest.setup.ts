import '@testing-library/jest-native/extend-expect';

// Basic mock for expo-router to avoid navigation errors in tests
jest.mock('expo-router', () => {
  const actual = jest.requireActual('expo-router');

  const useRouterMock = jest.fn(() => ({
    navigate: jest.fn(),
    back: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  }));

  return {
    ...actual,
    useRouter: useRouterMock,
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Default mock for expo-sqlite context; individual tests can override as needed
jest.mock('expo-sqlite', () => {
  const actual = jest.requireActual('expo-sqlite');

  return {
    ...actual,
    useSQLiteContext: jest.fn(() => ({
      getAllAsync: jest.fn(),
      prepareAsync: jest.fn(),
      execAsync: jest.fn(),
    })),
  };
});

// Lightweight mock for Tamagui components to avoid ESM parsing issues in Jest
jest.mock('tamagui', () => {
  const React = require('react');
  const { View, Text, ScrollView } = require('react-native');

  const Primitive = (props: any) =>
    React.createElement(View, props, props.children);

  const RadioGroup: any = (props: any) =>
    React.createElement(View, props, props.children);
  RadioGroup.Item = Primitive;
  RadioGroup.Indicator = Primitive;

  const Checkbox: any = (props: any) =>
    React.createElement(View, props, props.children);
  Checkbox.Indicator = Primitive;

  const AlertDialog: any = (props: any) =>
    React.createElement(View, props, props.children);
  AlertDialog.Trigger = (props: any) =>
    React.createElement(View, props, props.children);
  AlertDialog.Portal = (props: any) =>
    React.createElement(View, props, props.children);
  AlertDialog.Overlay = (props: any) =>
    React.createElement(View, props, props.children);
  AlertDialog.Content = (props: any) =>
    React.createElement(View, props, props.children);
  AlertDialog.Title = (props: any) =>
    React.createElement(Text, props, props.children);
  AlertDialog.Description = (props: any) =>
    React.createElement(Text, props, props.children);
  AlertDialog.Cancel = (props: any) =>
    React.createElement(View, props, props.children);
  AlertDialog.Action = (props: any) =>
    React.createElement(
      Text,
      { ...props, onPress: props.onPress },
      props.children,
    );

  const Slider: any = (props: any) =>
    React.createElement(View, props, props.children);
  Slider.Track = Primitive;
  Slider.TrackActive = Primitive;
  Slider.Thumb = Primitive;

  return {
    // basic primitives used in the app
    Text,
    View,
    ScrollView,
    YStack: Primitive,
    XStack: Primitive,
    Button: (props: any) =>
      React.createElement(
        Text,
        { ...props, onPress: props.onPress },
        props.children,
      ),
    Input: Primitive,
    Label: Text,
    Slider,
    RadioGroup,
    Checkbox,
    TextArea: Primitive,
    AlertDialog,
  };
});

// Icons from Tamagui lucide package can be safely stubbed
jest.mock('@tamagui/lucide-icons', () => {
  const React = require('react');
  const Stub = () => null;
  return new Proxy(
    {},
    {
      get: () => Stub,
    },
  );
});


