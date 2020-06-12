module.exports = (req, data) => {
  if (req.user.fullURL) {
    if (data instanceof Array)
      return data.map((datum) => {
        datum["fullURL"] = `https://file.microapi.dev/${datum.fileURL}`;
        return datum;
      });

    return (data["fullURL"] = `https://file.microapi.dev/${data.fileURL}`);
  }

  return data;
};
