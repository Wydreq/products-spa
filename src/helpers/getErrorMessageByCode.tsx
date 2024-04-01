export const getErrorMessageByCode = (code: string) => {
  switch (code) {
    case '400':
      return 'Bad request';
    case '401':
      return 'Unauthorized';
    case '403':
      return 'Forbidden';
    case '404':
      return 'Not Found';
    case '500':
      return 'Internal Server Error';
    case '501':
      return 'Not Implemented';
    case '502':
      return 'Bad Gateway';
    case '503':
      return 'Service Unavailable';
    default:
      return 'Unknown error code';
  }
};
