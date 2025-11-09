import axios from "axios";

const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;

export const createBoard = async (req, res, next) => {
  const { name } = req.body;
  try {
    const response = await axios.post(
      `https://api.trello.com/1/boards/?name=${name}&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};
