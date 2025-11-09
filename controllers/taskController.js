import axios from "axios";

const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;

// ✅ Create Trello card
export const createTask = async (req, res) => {
  const { name, desc, listId } = req.body;
  try {
    const response = await axios.post(
      `https://api.trello.com/1/cards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&idList=${listId}&name=${name}&desc=${desc}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error creating card:", error.message);
    res.status(500).json({ message: "Failed to create card" });
  }
};

// ✅ Update Trello card
export const updateTask = async (req, res) => {
  const { cardId } = req.params;
  const { name, desc, idList } = req.body;
  try {
    const response = await axios.put(
      `https://api.trello.com/1/cards/${cardId}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&name=${name}&desc=${desc}&idList=${idList}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error updating card:", error.message);
    res.status(500).json({ message: "Failed to update card" });
  }
};

// ✅ Delete Trello card
export const deleteTask = async (req, res) => {
  const { cardId } = req.params;
  try {
    await axios.put(
      `https://api.trello.com/1/cards/${cardId}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&closed=true`
    );
    res.status(200).json({ message: "Card deleted/closed successfully" });
  } catch (error) {
    console.error("Error deleting card:", error.message);
    res.status(500).json({ message: "Failed to delete card" });
  }
};
