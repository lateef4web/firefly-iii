import React from 'react';
import { Text } from '@react-email/components';

export interface HeaderHtmlProps {
  greeting: string;
}

export const HeaderHtml = ({ greeting }: HeaderHtmlProps) => (
  <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
    {greeting}
  </Text>
);

export default HeaderHtml;
