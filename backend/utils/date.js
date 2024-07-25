module.exports.dateTransform = () => {
  let lv_today_string = new Date().toISOString().slice(0, 10);
  return new Date(lv_today_string);
};
