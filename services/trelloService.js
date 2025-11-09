import axios from "axios";

const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;

export const createCard = async ({ name, desc, listId }) => {
  const response = await axios.post(
    `https://api.trello.com/1/cards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&idList=${listId}&name=${name}&desc=${desc}`
  );
  return response.data;
};

export const updateCard = async ({ cardId, name, desc, idList }) => {
  const response = await axios.put(
    `https://api.trello.com/1/cards/${cardId}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&name=${name}&desc=${desc}&idList=${idList}`
  );
  return response.data;
};

export const deleteCard = async (cardId) => {
  await axios.put(
    `https://api.trello.com/1/cards/${cardId}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&closed=true`
  );
};
