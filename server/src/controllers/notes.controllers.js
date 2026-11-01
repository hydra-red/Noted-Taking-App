function getNotes(req, res) {
  res.status(200).json({
    status: 200,
    message: "Data fetched Successfully",
  });
}

export {getNotes}