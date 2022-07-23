module.exports = () => {
  const todayDate = new Date();

  return `${todayDate.getDate()}/${todayDate.getMonth()}/${todayDate.getFullYear()}`;
};
