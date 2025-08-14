import React from 'react';
import { Html, Head, Body, Container, Text, Link } from '@react-email/components';
import HeaderHtml from './HeaderHtml';
import FooterHtml from './FooterHtml';

export interface ErrorHtmlEmailProps {
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
  token: string;
  method: string;
  url: string;
  stackTrace: string;
  headers: Record<string, string[]>;
  post?: string;
}

export const ErrorHtmlEmail = ({
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
  token,
  method,
  url,
  stackTrace,
  headers,
  post,
}: ErrorHtmlEmailProps) => (
  <Html lang="en">
    <Head>
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Message</title>
    </Head>
    <Body>
      <HeaderHtml greeting={greeting} />
      <Container>
        <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
          Firefly III v{version} reported: {errorMessage}
        </Text>
        <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
          Type: {className}
        </Text>
        <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
          Time: {time}
        </Text>
        <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
          Location: {file}:{line} ({code})
        </Text>
        <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
          {loggedIn && user ? `User: ${user.id} (${user.email})` : 'No user was logged in'}
        </Text>
        <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
          IP: {ip} (<Link href={`https://ipinfo.io/${ip}/json?token=${token}`}>info</Link>)<br />
          {method} URL: {url}
        </Text>
        <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
          Error stacktrace
        </Text>
        <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
          Please report this error on GitHub.
        </Text>
        <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
          Stacktrace below
        </Text>
        <Text style={{ fontFamily: 'monospace', fontSize: '11px', color: '#aaa' }}>
          {stackTrace}
        </Text>
        <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
          Headers
        </Text>
        <Text style={{ fontFamily: 'monospace', fontSize: '11px', color: '#aaa' }}>
          {Object.entries(headers)
            .filter(([key, value]) => key !== 'cookie' && key !== 'x-xsrf-token' && value[0])
            .map(([key, value]) => (
              <span key={key}>
                - {key}: {value[0]}<br />
              </span>
            ))}
        </Text>
        {post && (
          <>
            <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
              POST data
            </Text>
            <Text style={{ fontFamily: 'monospace', fontSize: '11px', color: '#aaa' }}>{post}</Text>
          </>
        )}
      </Container>
      <FooterHtml closing={closing} signature={signature} footerPs={footerPs} />
    </Body>
  </Html>
);

export default ErrorHtmlEmail;
