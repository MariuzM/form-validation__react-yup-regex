const isDebug = () => {
  return window.__ENV.REACT_APP_DEBUG === 'true';
};

export default isDebug;
