import type { ValidationError } from 'yup';

import isDebug from './isDebug';

type TypeErrorObject = {
  [key: string]: string;
};

export const yupErrGenerator = (
  err: ValidationError,
  isErrorCallback: (data: TypeErrorObject) => void
) => {
  if (err.inner) {
    const newErrorObj: TypeErrorObject = {};

    for (let i = 0; i < err.inner.length; i++) {
      const el = err.inner[i];
      if (el.path) newErrorObj[el.path] = el.message;
    }

    isErrorCallback(newErrorObj);
  } else {
    isDebug() && console.log('Error', JSON.stringify(err));
  }
};
