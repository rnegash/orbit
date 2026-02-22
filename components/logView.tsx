import { ReactNode } from "react";
import { ScrollView, YStack } from "tamagui";

type LogViewProps = {
  children: ReactNode;
};

export const LogView = ({ children }: LogViewProps) => (
  <ScrollView>
    <YStack gap="$4" padding="$6" paddingBottom="$10">
      {children}
    </YStack>
  </ScrollView>
);
