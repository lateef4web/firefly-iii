import React from 'react';
import { Html, Head, Body, Container, Text } from '@react-email/components';
import HeaderText from './HeaderText';
import FooterText from './FooterText';

export interface ErrorTextEmailProps {
  greeting: string;
  closing: string;
  signature: string;
  footerPs?: string;
  version: string;
  errorMessage: string;
  className: string;
  time: string;
  file: string;
  line: string | number;
  code: string;
  loggedIn: boolean;
  user?: { id: string | number; email: string };
  ip: string;
  method: string;
  url: string;
  userAgent: string;
  stackTrace: string;
  headers: Record<string, string[]>;
  post?: string;
}

export const ErrorTextEmail = ({
  greeting,
  closing,
  signature,
  footerPs,
  version,
  errorMessage,
  className,
  time,
  file,
  line,
  code,
  loggedIn,
  user,
  ip,
  method,
  url,
  userAgent,
  stackTrace,
  headers,
  post,
}: ErrorTextEmailProps) => (
  <Html>
    <Head />
    <Body>
      <HeaderText greeting={greeting} />
      <Container>
        <Text>Firefly III v{version} reported: {errorMessage}</Text>
        <Text>Type: {className}</Text>
        <Text>Time: {time}</Text>
        <Text>
          Location: {file}:{line} ({code})
        </Text>
        <Text>
          {loggedIn && user ? `User: ${user.id} (${user.email})` : 'No user was logged in'}
        </Text>
        <Text>IP: {ip}</Text>
        <Text>
          {method} URL: {url}
        </Text>
        <Text>User-Agent: {userAgent}</Text>
        <Text>Error stacktrace</Text>
        <Text>Please report this error on GitHub.</Text>
        <Text>Stacktrace below</Text>
        <Text>{stackTrace}</Text>
        <Text>Headers</Text>
        {Object.entries(headers)
          .filter(([key, value]) => key !== 'cookie' && key !== 'x-xsrf-token' && value[0])
          .map(([key, value]) => (
            <Text key={key}>- {key}: {value[0]}</Text>
          ))}
        {post && (
          <>
            <Text>POST data</Text>
            <Text>{post}</Text>
          </>
        )}
      </Container>
      <FooterText closing={closing} signature={signature} footerPs={footerPs} />
    </Body>
  </Html>
);

export default ErrorTextEmail;
