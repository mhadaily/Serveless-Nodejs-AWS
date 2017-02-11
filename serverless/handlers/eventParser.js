module.exports.parseEvent = (event) => {
  return {
    data: event.data,
    path: event.path,
    id: event.path.id,
    stage: event.stage,
    params: JSON.parse(event.params || "{}")
  };
};