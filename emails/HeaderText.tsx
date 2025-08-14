import React from 'react';
import { Text } from '@react-email/components';

export interface HeaderTextProps {
  greeting: string;
}

export const HeaderText = ({ greeting }: HeaderTextProps) => (
  <Text>{greeting}</Text>
);

export default HeaderText;
