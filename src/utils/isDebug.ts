const isDebug = () => {
  return import.meta.env.REACT_APP_DEBUG === true;
};

export default isDebug;
